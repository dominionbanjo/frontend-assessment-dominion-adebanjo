import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../../components/shared/Header";
import { renderWithProviders } from "../test-utils";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

describe("Header component", () => {
  it("renders sign in button when not authenticated", () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("opens login modal when sign in button is clicked", async () => {
    renderWithProviders(<Header />);
    const signInBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });
  });

  it("shows user profile when authenticated", () => {
    const preloadedState = {
      auth: {
        user: { firstName: "Jane", lastName: "Doe", email: "jane@example.com" },
        isAuthenticated: true,
      },
    };
    renderWithProviders(<Header />, { preloadedState });
    
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /sign in/i })).not.toBeInTheDocument();
  });

  it("logs out correctly", async () => {
    const preloadedState = {
      auth: {
        user: { firstName: "Jane", lastName: "Doe", email: "jane@example.com" },
        isAuthenticated: true,
      },
    };
    const { store } = renderWithProviders(<Header />, { preloadedState });
    
    const profileBtn = screen.getByText("Jane");
    fireEvent.click(profileBtn);
    
    const signOutBtn = screen.getByText(/sign out/i);
    fireEvent.click(signOutBtn);
    
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});
