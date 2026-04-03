'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun1 } from 'iconsax-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-surface animate-pulse border border-border"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full border border-border hover:bg-surface-hover transition-all text-muted-foreground active:scale-95"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <Sun1 size="20" color="currentColor" variant="Bold" />
      ) : (
        <Moon size="20" color="currentColor" variant="Bold" />
      )}
    </button>
  );
}
