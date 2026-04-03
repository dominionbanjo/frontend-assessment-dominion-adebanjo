export default function ArtworkDetailSkeleton() {
  return (
    <main className="page-container">
      <nav className="mb-8">
        <div className="h-10 w-24 skeleton rounded-sm inline-flex"></div>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* Image Skeleton */}
        <div className="w-full lg:w-3/5 rounded-sm overflow-hidden skeleton border border-border shadow-sm relative pt-[100%] md:pt-[75%] lg:pt-[80%]"></div>

        {/* Info Skeleton */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="h-10 w-full skeleton"></div>
            <div className="h-10 w-3/4 skeleton mb-2"></div>
            <div className="h-6 w-1/2 skeleton"></div>
            <div className="h-5 w-1/3 skeleton"></div>
          </div>

          <div className="grid grid-cols-2 gap-8 py-6 border-y border-border/50 mt-4">
            <div className="space-y-3">
              <div className="h-3 w-1/4 skeleton"></div>
              <div className="h-6 w-3/4 skeleton"></div>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-1/4 skeleton"></div>
              <div className="h-6 w-full skeleton"></div>
            </div>
          </div>

          <div className="py-2 space-y-3">
            <div className="h-3 w-1/4 skeleton"></div>
            <div className="h-5 w-1/2 skeleton"></div>
          </div>

          <div className="flex gap-4 mt-2">
            <div className="h-12 w-full skeleton rounded-sm"></div>
            <div className="h-12 w-12 skeleton rounded-sm shrink-0"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
