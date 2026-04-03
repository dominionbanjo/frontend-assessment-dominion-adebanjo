'use client';

import { useEffect } from 'react';
import { Warning2 } from 'iconsax-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('AIC Gallery Render Error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[75vh] bg-background">
      <div className="max-w-xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-flex items-center justify-center">
          {/* Arty Frames in Danger Color for Contrast */}
          <div className="absolute w-32 h-32 border border-danger/10 rounded-sm animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute w-28 h-28 border border-danger/20 rounded-sm animate-[spin_15s_linear_infinite_reverse]"></div>
          
          {/* Danger Brand Mark */}
          <div className="w-16 h-16 bg-danger rounded-sm flex items-center justify-center shadow-2xl relative z-10 transform scale-100 hover:scale-105 transition-transform animate-pulse">
            <Warning2 size="32" color="currentColor" variant="Bold" className="text-danger-foreground" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight text-foreground">
            Exhibition Failure
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-sans max-w-lg mx-auto leading-relaxed">
            {error.message || 'We encountered an unexpected error while preparing this curation. Please try refreshing your view.'}
          </p>
        </div>

        <div className="pt-6">
          <button 
            onClick={() => reset()} 
            className="btn btn-danger px-10 h-14 text-lg tracking-wide hover:shadow-premium transition-all active:scale-95"
          >
            Refresh Gallery
          </button>
        </div>

        {/* Minimal Decorative Separator */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="h-px w-12 bg-border"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-danger/20"></div>
          <div className="h-px w-12 bg-border"></div>
        </div>
      </div>
    </div>
  );
}
