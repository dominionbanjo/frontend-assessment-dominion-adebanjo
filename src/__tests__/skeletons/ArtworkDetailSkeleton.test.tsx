import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArtworkDetailSkeleton from "../../components/skeletons/ArtworkDetailSkeleton";

describe("ArtworkDetailSkeleton component", () => {
  it("renders without crashing", () => {
    const { container } = render(<ArtworkDetailSkeleton />);
    const skeletons = container.querySelectorAll(".skeleton");
    expect(skeletons.length).toBeGreaterThan(5);
  });
});
