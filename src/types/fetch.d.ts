export {};

declare global {
  interface RequestInit {
    cf?: {
      cacheEverything?: boolean;
      cacheTtl?: number;
      cacheTtlByStatus?: Record<string, number>;
    };
  }
}
