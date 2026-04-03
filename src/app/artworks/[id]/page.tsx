import { getArtworkById, getImageUrl } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import ArtworkDetailSkeleton from "@/components/skeletons/ArtworkDetailSkeleton";

// Route-level code splitting via dynamic imports
const ArtworkDetailClient = dynamic(
  () => import("@/clientPages/ArtworkDetailClient"),
  {
    loading: () => <ArtworkDetailSkeleton />,
    ssr: true,
  },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const p = await params;
  try {
    const data = await getArtworkById(p.id);
    const artwork = data.data;
    console.log(data);

    return {
      title: `${artwork.title} | Art Institute of Chicago Gallery`,
      description: [
        artwork.artist_title || artwork.artist_display,
        artwork.artwork_type_title,
        artwork.place_of_origin ? `Origin: ${artwork.place_of_origin}` : null,
        artwork.date_display,
      ].filter(Boolean).join(" - ") || "Explore this artwork at the Art Institute of Chicago.",
      openGraph: {
        images: [getImageUrl(artwork.image_id, 800)],
      },
    };
  } catch (e) {
    return { title: "Artwork Not Found" };
  }
}

export default async function ArtworkDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  let artwork;

  try {
    const data = await getArtworkById(p.id);
    artwork = data.data;
  } catch (error) {
    notFound();
  }

  if (!artwork) notFound();

  return <ArtworkDetailClient artwork={artwork} />;
}
