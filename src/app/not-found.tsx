import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[75vh] bg-background">
      <div className="max-w-xl w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="relative inline-flex items-center justify-center group">
          {/* Arty Frames for Consistency */}
          <div className="absolute w-32 h-32 border border-primary/10 rounded-sm animate-[spin_12s_linear_infinite]"></div>
          <div className="absolute w-28 h-28 border border-primary/20 rounded-sm animate-[spin_20s_linear_infinite_reverse]"></div>

          {/* The Status Mark */}
          <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center shadow-2xl relative z-10 transform transition-transform group-hover:scale-110">
            <span className="text-primary-foreground text-2xl font-serif italic">
              404
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif italic font-bold tracking-tight text-foreground">
            Lost at the Gallery
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-sans max-w-lg mx-auto leading-relaxed">
            The masterpiece you&apos;re seeking isn&apos;t on display at this
            location. Perhaps it has been moved to another exhibition Wing.
          </p>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="btn btn-primary px-10 h-14 text-lg tracking-wide hover:shadow-premium transition-all active:scale-95"
          >
            Return to Collection
          </Link>
        </div>

        {/* Minimal Decorative Element */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="h-px w-12 bg-border"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
          <div className="h-px w-12 bg-border"></div>
        </div>
      </div>
    </div>
  );
}
