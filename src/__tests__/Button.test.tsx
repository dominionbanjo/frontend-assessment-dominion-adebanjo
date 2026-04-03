import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../components/ui/Button";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("applies the primary variant class by default", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button", { name: /button/i });
    expect(button.className).toContain("btn-primary"); // snippet of primary classes
  });

  it("applies danger variant classes when specified", () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button.className).toContain("btn-danger");
  });

  it("respects the disabled prop and does not fire clicks", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("merges custom className with base classes", () => {
    render(<Button className="custom-class-123">Custom</Button>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button.className).toContain("custom-class-123");
    expect(button.className).toContain("btn");
  });
});
