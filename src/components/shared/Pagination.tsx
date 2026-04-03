'use client';

import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="pagination-item disabled:opacity-30 mr-2"
        aria-label="Previous Page"
      >
        <ArrowLeft2 size="16" color="currentColor" variant="Outline" />
      </button>

      <div className="hidden sm:flex items-center gap-2">
        {getPageNumbers()[0] > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="pagination-item">1</button>
            {getPageNumbers()[0] > 2 && <span className="text-muted-foreground px-1">...</span>}
          </>
        )}
        
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-item ${currentPage === page ? 'pagination-item-active' : ''}`}
          >
            {page}
          </button>
        ))}

        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <span className="text-muted-foreground px-1">...</span>
            )}
            <button onClick={() => handlePageChange(totalPages)} className="pagination-item">{totalPages}</button>
          </>
        )}
      </div>

      <div className="sm:hidden text-sm font-medium px-4">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
        className="pagination-item disabled:opacity-30 ml-2"
        aria-label="Next Page"
      >
        <ArrowRight2 size="16" color="currentColor" variant="Outline" />
      </button>
    </div>
  );
}
