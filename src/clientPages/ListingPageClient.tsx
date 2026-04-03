'use client';

import { Suspense } from 'react';
import SearchBar from '@/components/shared/SearchBar';

interface ListingPageClientProps {
  q: string;
  children: React.ReactNode;
}

export default function ListingPageClient({ q, children }: ListingPageClientProps) {
  return (
    <main className="page-container">
      <header className="mb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-6 border-b border-border mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-serif italic tracking-tight text-foreground">
            Art Collection {q && <span className="text-primary font-normal text-2xl not-italic ml-2">/ &ldquo;{q}&rdquo;</span>}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl font-sans">
            Explore thousands of curated masterpieces from the Art Institute Gallery collection.
          </p>
        </div>
        
        <Suspense fallback={<div className="w-full md:w-80 h-12 skeleton rounded-sm"></div>}>
          <div className="w-full md:w-80 relative">
            <SearchBar />
          </div>
        </Suspense>
      </header>

      {children}
    </main>
  );
}
