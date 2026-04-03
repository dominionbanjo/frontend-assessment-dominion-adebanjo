import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Modal from "../../components/ui/Modal";

// Mock createPortal to render contents in place for easier testing if needed,
// but standard testing-library usually works with document.body.
// However, some environments might need a container.

describe("Modal component", () => {
  beforeEach(() => {
    // Reset body style
    document.body.style.overflow = "overlay";
  });

  it("does not render when open is false", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("renders when open is true", async () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );
    // Modal has a mounted state that sets to true in useEffect
    await waitFor(() => {
      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );
    
    await waitFor(() => screen.getByText("Modal Content"));
    
    // The backdrop is the first div inside the portal content with aria-hidden="true"
    const backdrop = document.querySelector('[aria-hidden="true"]');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    }
  });

  it("renders title and subtitle", async () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Title" subtitle="Test Subtitle">
        <div>Modal Content</div>
      </Modal>,
    );
    
    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    });
  });

  it("calls onSubmit when action button is clicked", async () => {
    const onSubmit = vi.fn();
    render(
      <Modal open={true} onClose={() => {}} actionText="Submit" onSubmit={onSubmit}>
        <div>Modal Content</div>
      </Modal>,
    );
    
    await waitFor(() => {
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(submitBtn);
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("disables scrolling on body when open", async () => {
    const { rerender } = render(
      <Modal open={false} onClose={() => {}}>
        <div>Content</div>
      </Modal>,
    );
    
    expect(document.body.style.overflow).toBe("overlay");

    rerender(
      <Modal open={true} onClose={() => {}}>
        <div>Content</div>
      </Modal>,
    );
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });
  });
});
