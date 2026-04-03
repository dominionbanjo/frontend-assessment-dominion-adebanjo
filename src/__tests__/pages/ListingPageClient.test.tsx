import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ListingPageClient from "../../clientPages/ListingPageClient";

// Mock SearchBar
vi.mock("@/components/shared/SearchBar", () => ({
  default: () => <div data-testid="search-bar">Search Bar</div>,
}));

describe("ListingPageClient component", () => {
  it("renders correctly with search query", () => {
    render(
      <ListingPageClient q="monet">
        <div>Artworks Grid</div>
      </ListingPageClient>,
    );
    expect(screen.getByText(/monet/i)).toBeInTheDocument();
    expect(screen.getByText("Artworks Grid")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("renders correctly without search query", () => {
    render(
      <ListingPageClient q="">
        <div>Artworks Grid</div>
      </ListingPageClient>,
    );
    expect(screen.getByText("Art Collection")).toBeInTheDocument();
    expect(screen.queryByText("/")).not.toBeInTheDocument();
  });
});
