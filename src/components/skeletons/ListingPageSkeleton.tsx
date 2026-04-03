export default function ListingPageSkeleton() {
  return (
    <div className="page-container animate-pulse h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-8 border-b border-border/50">
        <div className="space-y-4 w-full md:w-1/2">
          <div className="h-12 w-3/4 skeleton rounded-sm"></div>
          <div className="h-6 w-1/2 skeleton rounded-sm"></div>
        </div>
        <div className="w-full md:w-80 h-12 skeleton rounded-sm"></div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[3/4] skeleton rounded-sm w-full"></div>
            <div className="space-y-2">
              <div className="h-5 w-3/4 skeleton rounded-sm"></div>
              <div className="h-4 w-1/2 skeleton rounded-sm"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
