import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchBar from "../../components/shared/SearchBar";

// Mock next/navigation
const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams("");
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/artworks",
  useSearchParams: () => mockSearchParams,
}));

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/search artworks/i)).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search artworks/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "monet" } });
    expect(input.value).toBe("monet");
  });

  it("debounces the search and updates URL", async () => {
    vi.useRealTimers();
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search artworks/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "monet" } });
    
    // Wait for debounce (400ms) + buffer
    await new Promise(r => setTimeout(r, 600));
    
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled();
    }, { timeout: 2000 });
    
    expect(mockReplace).toHaveBeenCalledWith("/artworks?q=monet&page=1", { scroll: false });
    vi.useFakeTimers();
  });

  it("clears search when clear button is clicked", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search artworks/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "monet" } });
    
    const clearBtn = screen.getByTitle(/clear search/i);
    fireEvent.click(clearBtn);
    
    expect(input.value).toBe("");
  });
});
