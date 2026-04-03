'use client';

import { Warning2 } from 'iconsax-react';
import { Outfit, Playfair_Display } from 'next/font/google';

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} dark`}>
      <body className="bg-zinc-950 font-sans text-zinc-50 flex items-center justify-center min-h-screen p-4 overflow-hidden">
        <div className="max-w-xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-1000">
          <div className="relative inline-flex items-center justify-center">
            {/* The Arty frames for Consistency */}
            <div className="absolute w-32 h-32 border border-red-500/10 rounded-sm animate-[spin_30s_linear_infinite]"></div>
            <div className="absolute w-28 h-28 border border-red-500/20 rounded-sm animate-[spin_20s_linear_infinite_reverse]"></div>
            
            {/* Massive Danger Mark */}
            <div className="w-16 h-16 bg-red-600 rounded-sm flex items-center justify-center shadow-2xl relative z-10 transform skew-x-2 animate-bounce">
              <Warning2 size="32" color="#ffffff" variant="Bold" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-serif italic font-bold tracking-tight text-white">
              Critical Gallery Error
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-sans max-w-lg mx-auto leading-relaxed">
              Our exhibition servers encountered a critical failure. This is highly unusual. 
              We apologize for the interruption in your viewing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto h-14 px-10 bg-red-600 hover:bg-red-700 text-white rounded-sm font-medium tracking-wide transition-all active:scale-95 shadow-xl"
            >
              Attempt Recovery
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full sm:w-auto h-14 px-10 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-sm font-medium tracking-wide transition-colors active:scale-95"
            >
              Back to Entrance
            </button>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 pt-6 opacity-30">
            <div className="h-px w-16 bg-zinc-800"></div>
            <div className="w-2 h-2 border border-zinc-800 rounded-full"></div>
            <div className="h-px w-16 bg-zinc-800"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
