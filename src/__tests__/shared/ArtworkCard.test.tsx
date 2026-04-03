import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArtworkCard from "../../components/shared/ArtworkCard";
import { Artwork } from "../../types";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockArtwork: Artwork = {
  id: 1,
  title: "Test Artwork",
  artist_title: "Test Artist",
  artist_display: "Test Artist",
  image_id: "test-image",
  date_display: "2024",
  thumbnail: { lqip: "test-lqip", width: 100, height: 100, alt_text: "test-alt" },
  medium_display: "Oil on canvas",
  short_description: "A description",
  description: "A longer description",
  is_public_domain: true,
  artwork_type_title: "Painting",
};

describe("ArtworkCard component", () => {
  it("renders artwork details correctly", () => {
    render(<ArtworkCard artwork={mockArtwork} />);
    expect(screen.getByText("Test Artwork")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("links to the correct artwork detail page", () => {
    render(<ArtworkCard artwork={mockArtwork} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/artworks/1");
  });

  it("shows 'No display' if image_id is missing", () => {
    const artworkWithoutImage = { ...mockArtwork, image_id: "" };
    render(<ArtworkCard artwork={artworkWithoutImage} />);
    expect(screen.getByText(/no display/i)).toBeInTheDocument();
  });

  it("shows 'Unknown Artist' if artist_title is missing", () => {
    const artworkWithoutArtist = { ...mockArtwork, artist_title: "" };
    render(<ArtworkCard artwork={artworkWithoutArtist} />);
    expect(screen.getByText(/unknown artist/i)).toBeInTheDocument();
  });
});
