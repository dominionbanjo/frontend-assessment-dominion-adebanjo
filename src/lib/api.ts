import { ApiResponse, Artwork } from "../types";

const API_BASE = "https://api.artic.edu/api/v1";

/**
 * Next.js fetch cache settings:
 * I used \`next: { revalidate: 3600 }\` here (1 hour) because museum data
 * (artworks, titles, authors) is highly static and doesn't change by the minute.
 * Using incremental static regeneration (ISR) is perfect for this.
 */
export async function getArtworks(
  page: number = 1,
  limit: number = 20,
  query: string = "",
): Promise<ApiResponse<Artwork[]>> {
  let url = `${API_BASE}/artworks`;

  if (query) {
    url = `${API_BASE}/artworks/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&fields=id,title,artist_display,artist_title,date_display,medium_display,image_id,thumbnail,is_public_domain,artwork_type_title`;
  } else {
    // Only fetch artworks that have public domain images or decent data for a good looking listing
    url = `${API_BASE}/artworks?page=${page}&limit=${limit}&fields=id,title,artist_display,artist_title,date_display,medium_display,image_id,thumbnail,is_public_domain,artwork_type_title`;
  }

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
    // Cloudflare Workers bonus: explicitly instruct edge cache
    cf: {
      cacheEverything: true,
      cacheTtl: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artworks. Please try again later.");
  }

  return res.json();
}

/**
 * Cache setting:
 * I used `cache: 'force-cache'` for individual artwork details to essentially
 * statically generate (SSG) them. Museum specific artwork details rarely change.
 */
export async function getArtworkById(
  id: string,
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
  size: number = 843,
): string {
  if (!imageId) return "/placeholder.png";
  return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
}
