import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ThemeToggle from "../../components/ui/ThemeToggle";

// Mock next-themes
const setTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme,
  }),
}));

describe("ThemeToggle component", () => {
  it("renders correct icon when theme is light", async () => {
    render(<ThemeToggle />);
    // useEffect mounts
    await waitFor(() => {
      // It renders a button with aria-label Toggle Dark Mode
      expect(screen.getByLabelText(/toggle dark mode/i)).toBeInTheDocument();
    });
  });

  it("calls setTheme when clicked", async () => {
    render(<ThemeToggle />);
    await waitFor(() => {
      const button = screen.getByLabelText(/toggle dark mode/i);
      fireEvent.click(button);
      expect(setTheme).toHaveBeenCalledWith("dark");
    });
  });
});
