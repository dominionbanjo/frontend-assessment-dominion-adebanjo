export default function ArtworkGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="card flex flex-col h-full bg-background border border-border shadow-sm rounded-sm overflow-hidden min-h-[400px]">
          <div className="relative pt-[120%] skeleton rounded-none border-b border-border"></div>
          <div className="p-5 flex flex-col flex-1 gap-4">
            <div className="h-5 w-full skeleton"></div>
            <div className="mt-auto flex flex-col gap-2">
              <div className="h-3 w-1/2 skeleton"></div>
              <div className="h-3 w-1/3 skeleton opacity-60"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
