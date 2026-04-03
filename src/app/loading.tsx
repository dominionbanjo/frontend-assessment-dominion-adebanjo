export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-background gap-8 overflow-hidden animate-in fade-in duration-700">
      <div className="relative flex items-center justify-center">
        {/* The Artistic Outer Frames */}
        <div className="absolute w-32 h-32 border border-primary/10 dark:border-primary/20 rounded-sm animate-[spin_8s_linear_infinite]"></div>
        <div className="absolute w-28 h-28 border border-primary/30 dark:border-primary/40 rounded-sm animate-[spin_12s_linear_infinite_reverse]"></div>
        <div className="absolute w-24 h-24 border-2 border-primary/5 rounded-sm animate-pulse"></div>
        
        {/* The Central Brand Mark */}
        <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center shadow-2xl dark:shadow-[0_0_30px_inset_rgba(0,0,0,0.1),0_0_30px_rgba(255,255,255,0.05)] relative z-10 transform scale-100 hover:scale-105 transition-transform">
          <span className="text-primary-foreground text-2xl font-serif italic select-none">
            AIC
          </span>
        </div>
      </div>
      
      {/* Loading Typography */}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-serif italic text-foreground tracking-wide">
          Art Institute of Chicago Gallery
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-border"></div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans font-medium">
            Curating Experience
          </p>
          <div className="h-px w-8 bg-border"></div>
        </div>
      </div>
    </div>
  );
}
