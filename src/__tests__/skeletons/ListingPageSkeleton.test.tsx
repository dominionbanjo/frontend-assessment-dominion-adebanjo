import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ListingPageSkeleton from "../../components/skeletons/ListingPageSkeleton";

describe("ListingPageSkeleton component", () => {
  it("renders without crashing", () => {
    const { container } = render(<ListingPageSkeleton />);
    const skeletons = container.querySelectorAll(".skeleton");
    expect(skeletons.length).toBeGreaterThan(5);
  });
});
