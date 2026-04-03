'use client';

import { SearchNormal1, CloseCircle } from 'iconsax-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [term, setTerm] = useState(searchParams?.get('q') || '');

  // Synchronize internal state with URL params (e.g. for "Clear Search" clicks)
  useEffect(() => {
    const q = searchParams?.get('q') || '';
    if (q !== term) {
      setTerm(q);
    }
  }, [searchParams]);

  // Debounced search logic
  useEffect(() => {
    const currentQ = searchParams?.get('q') || '';
    if (term === currentQ) return; // Prevent loop

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (term) {
        params.set('q', term);
        params.set('page', '1'); // reset page on new search
      } else {
        params.delete('q');
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [term, router, pathname, searchParams]);

  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
        <SearchNormal1 size="18" variant="Outline" color="currentColor" />
      </div>
      <input
        type="text"
        placeholder="Search artworks, artists..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="input-field pl-11 pr-11 shadow-premium group-hover:shadow-premium-hover transition-all duration-300"
      />
      <div className="absolute inset-y-0 right-3.5 flex items-center gap-2">
        {term && !isPending && (
          <button
            onClick={() => setTerm('')}
            className="text-muted-foreground hover:text-primary transition-colors p-0.5 rounded-full hover:bg-surface"
            title="Clear search"
          >
            <CloseCircle size="20" variant="Outline" color="currentColor" />
          </button>
        )}
        {isPending && (
          <div className="w-4 h-4 border-2 border-muted-fg/20 border-t-primary rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
