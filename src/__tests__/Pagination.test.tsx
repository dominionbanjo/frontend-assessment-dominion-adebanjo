import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination from '../components/shared/Pagination';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/artworks',
  useSearchParams: () => ({
    toString: () => 'q=vangogh',
  }),
}));

describe('Pagination component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Pagination currentPage={1} totalPages={10} />);
    expect(screen.getByText(/Page/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('disables "Prev" button on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} />);
    const prevBtn = screen.getByRole('button', { name: /prev/i });
    expect(prevBtn).toBeDisabled();
  });

  it('disables "Next" button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeDisabled();
  });

  it('navigates to next page correctly', () => {
    render(<Pagination currentPage={2} totalPages={10} />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    
    fireEvent.click(nextBtn);
    
    // Original params was q=vangogh. Setting page to 3.
    expect(mockPush).toHaveBeenCalledWith('/artworks?q=vangogh&page=3', { scroll: true });
  });

  it('navigates to prev page correctly', () => {
    render(<Pagination currentPage={2} totalPages={10} />);
    const prevBtn = screen.getByRole('button', { name: /prev/i });
    
    fireEvent.click(prevBtn);
    
    // Setting page to 1
    expect(mockPush).toHaveBeenCalledWith('/artworks?q=vangogh&page=1', { scroll: true });
  });
});
