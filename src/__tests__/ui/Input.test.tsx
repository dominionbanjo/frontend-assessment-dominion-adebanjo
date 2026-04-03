import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../../components/ui/Input";

describe("Input component", () => {
  it("renders with label correctly", () => {
    render(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  it("shows required asterisk when specified", () => {
    render(<Input label="Username" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(<Input label="Username" error="Field is required" />);
    expect(screen.getByText(/field is required/i)).toBeInTheDocument();
  });

  it("applies error classes when error is present", () => {
    render(<Input error="Field is required" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-danger");
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("passes extra attributes to the input element", () => {
    const { container } = render(<Input type="password" name="test-input" />);
    // password input isn't a "textbox" role.
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
    expect(input?.getAttribute("name")).toBe("test-input");
  });
});
