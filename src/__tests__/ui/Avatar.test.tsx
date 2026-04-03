import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Avatar from "../../components/ui/Avatar";

describe("Avatar component", () => {
  it("renders initials correctly", () => {
    render(<Avatar firstName="John" lastName="Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("handles missing names gracefully", () => {
    // @ts-ignore
    render(<Avatar firstName="" lastName="" />);
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Avatar firstName="J" lastName="D" size="sm" />);
    let avatar = screen.getByText("JD");
    expect(avatar.className).toContain("w-8 h-8");

    rerender(<Avatar firstName="J" lastName="D" size="lg" />);
    avatar = screen.getByText("JD");
    expect(avatar.className).toContain("w-12 h-12");
  });

  it("merges custom className", () => {
    render(<Avatar firstName="J" lastName="D" className="custom-avatar" />);
    const avatar = screen.getByText("JD");
    expect(avatar.className).toContain("custom-avatar");
  });
});
