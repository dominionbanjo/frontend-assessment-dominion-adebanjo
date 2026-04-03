export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  medium_display: string;
  description?: string;
  short_description?: string;
  image_id: string;
  thumbnail?: {
    alt_text: string;
    width: number;
    height: number;
    lqip?: string;
  };
  is_public_domain: boolean;
  artwork_type_title: string;
  artist_title?: string;
  credit_line?: string;
  dimensions?: string;
  place_of_origin?: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface ApiResponse<T> {
  pagination: Pagination;
  data: T;
  info?: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config?: {
    iiif_url: string;
    website_url: string;
  };
}
