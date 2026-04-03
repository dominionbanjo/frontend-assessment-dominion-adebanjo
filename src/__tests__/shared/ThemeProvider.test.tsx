import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ThemeProvider from "../../components/shared/ThemeProvider";

describe("ThemeProvider component", () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <div>Theme Child</div>
      </ThemeProvider>,
    );
    expect(screen.getByText("Theme Child")).toBeInTheDocument();
  });
});
