import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import ArtworkCard from "@/components/shared/ArtworkCard";
import { getArtworks } from "@/lib/api";
import ArtworkGridSkeleton from "@/components/skeletons/ArtworkGridSkeleton";
import dynamic from "next/dynamic";
import ListingPageSkeleton from "@/components/skeletons/ListingPageSkeleton";

// Route-level code splitting via dynamic imports
const ListingPageClient = dynamic(
  () => import("@/clientPages/ListingPageClient"),
  {
    loading: () => <ListingPageSkeleton />,
    ssr: true,
  },
);

// B-2 Bonus: Explicitly streamed Server Component
async function ArtworkGrid({ q, page }: { q: string; page: number }) {
  const artworksData = await getArtworks(page, 20, q);

  if (!artworksData || !artworksData.data) {
    notFound();
  }

  const { data: artworks, pagination } = artworksData;

  if (artworks.length === 0) {
    return (
      <div className="py-32 text-center flex flex-col items-center justify-center border border-dashed border-border rounded-sm bg-surface">
        <h2 className="text-xl font-medium mb-2 text-foreground">
          No artworks found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto italic font-serif">
          We couldn&apos;t find any pieces matching &ldquo;{q}&rdquo;. Try
          adjusting your search terms or exploring the collection without
          filters.
        </p>
        {q && (
          <Link href="/" className="btn btn-secondary mt-6 px-6">
            Clear search
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((item) => (
          <ArtworkCard key={item.id} artwork={item} />
        ))}
      </div>

      {pagination && pagination.total_pages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
          />
        </div>
      )}
    </div>
  );
}

export default async function ListingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const q = typeof params.q === "string" ? params.q : "";

  return (
    <ListingPageClient q={q}>
      <Suspense key={q + page} fallback={<ArtworkGridSkeleton />}>
        <ArtworkGrid q={q} page={page} />
      </Suspense>
    </ListingPageClient>
  );
}
