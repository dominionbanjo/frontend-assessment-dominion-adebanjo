import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArtworkDetailClient from "../../clientPages/ArtworkDetailClient";
import { Artwork } from "../../types";

// Mock next/navigation
const mockBack = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockArtwork: Artwork = {
  id: 1,
  title: "Mona Lisa",
  artist_title: "Leonardo da Vinci",
  artist_display: "Leonardo da Vinci",
  image_id: "mona-lisa-id",
  date_display: "1503",
  medium_display: "Oil on poplar panel",
  is_public_domain: true,
  artwork_type_title: "Painting",
};

describe("ArtworkDetailClient component", () => {
  it("renders artwork details correctly", () => {
    render(<ArtworkDetailClient artwork={mockArtwork} />);
    expect(screen.getByText("Mona Lisa")).toBeInTheDocument();
    expect(screen.getByText("Leonardo da Vinci")).toBeInTheDocument();
    expect(screen.getByText("1503")).toBeInTheDocument();
  });

  it("calls router.back() when back button is clicked", () => {
    render(<ArtworkDetailClient artwork={mockArtwork} />);
    const backBtn = screen.getByRole("button", { name: /back to gallery/i });
    fireEvent.click(backBtn);
    expect(mockBack).toHaveBeenCalled();
  });

  it("displays public domain status correctly", () => {
    const { rerender } = render(<ArtworkDetailClient artwork={mockArtwork} />);
    expect(screen.getByText(/public domain/i)).toBeInTheDocument();

    const copyrightedArtwork = { ...mockArtwork, is_public_domain: false };
    rerender(<ArtworkDetailClient artwork={copyrightedArtwork} />);
    expect(screen.getByText(/copyright protected/i)).toBeInTheDocument();
  });
});
