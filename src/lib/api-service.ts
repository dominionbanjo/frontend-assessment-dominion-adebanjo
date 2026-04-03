import { Artwork, ApiResponse } from "@/types";

const API_BASE = "https://api.artic.edu/api/v1";

/**
 * Core service logic for fetching from the Art Institute of Chicago API.
 * This runs on the "Next.js server" (API routes or Server Components).
 */

export async function fetchArtworksFromAIC(
  page: number = 1,
  limit: number = 20,
  query: string = ""
): Promise<ApiResponse<Artwork[]>> {
  let url = `${API_BASE}/artworks`;

  if (query) {
    url = `${API_BASE}/artworks/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&fields=id,title,artist_display,artist_title,date_display,medium_display,image_id,thumbnail,is_public_domain,artwork_type_title`;
  } else {
    url = `${API_BASE}/artworks?page=${page}&limit=${limit}&fields=id,title,artist_display,artist_title,date_display,medium_display,image_id,thumbnail,is_public_domain,artwork_type_title`;
  }

  const res = await fetch(url, {
    next: { revalidate: 3600 },
    // @ts-ignore - Cloudflare Workers bonus: explicitly instruct edge cache
    cf: {
      cacheEverything: true,
      cacheTtl: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artworks. Please try again later.");
  }

  const data: ApiResponse<Artwork[]> = await res.json();

  // Filter out artworks that have no display (no image_id)
  if (data.data && Array.isArray(data.data)) {
    data.data = data.data.filter((artwork: Artwork) => !!artwork.image_id);
  }

  return data;
}

export async function fetchArtworkByIdFromAIC(
  id: string
): Promise<ApiResponse<Artwork>> {
  const url = `${API_BASE}/artworks/${id}`;

  const res = await fetch(url, {
    cache: "force-cache",
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Artwork not found");
    }
    throw new Error("Failed to fetch artwork details.");
  }

  return res.json();
}

/**
 * Helper to construct the IIIF image URL
 */
export function getImageUrl(
  imageId: string | undefined,
  size: number = 843
): string {
  if (!imageId) return "/placeholder.png";
  return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
}
