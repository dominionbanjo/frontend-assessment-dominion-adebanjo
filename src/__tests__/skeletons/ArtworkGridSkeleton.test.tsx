import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArtworkGridSkeleton from "../../components/skeletons/ArtworkGridSkeleton";

describe("ArtworkGridSkeleton component", () => {
  it("renders correct number of skeleton items", () => {
    const { container } = render(<ArtworkGridSkeleton />);
    // Check for the number of grid items (12 in the file)
    const items = container.querySelectorAll(".card");
    expect(items.length).toBe(12);
  });
});
