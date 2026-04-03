# Art Institute of Chicago Gallery

A production-ready Content Explorer built to fetch, display, and interact with the public collection from the Art Institute of Chicago API.

It satisfies all critical assignments of the Front End Assessment framework, demonstrating rigorous Next.js 14+ App Router practices, bespoke CSS token design systems, accessible UI interactions, and aggressive Lighthouse optimisations.

## Setup Instructions

Clone the repository and run the local development server in 2 commands:

```bash
# 1. Install dependencies
npm install

# 2. Start the Next.js development server
npm run dev
```

Visit `http://localhost:3000` to interact with the application.

## Architecture Decisions

The system is broken down into functional boundaries:

- **`/src/app`**: Exclusively contains Next.js Native App Router routes, page boundaries, nested loading wrappers (`loading.tsx`), and granular error Catch Boundaries (`error.tsx`, `global-error.tsx`).
- **`/src/components`**: All generic stateless React views structure into atomic `/ui` components (e.g. `<Button />`, `<Modal />`) and complex structured `/shared` layout compositions (e.g. `<SearchBar />`, `<Pagination />`).
- **`/src/lib`**: Isolate the business abstraction logic away from the view layouts. `fetch()` defaults are intercepted and wrapped within `api.ts`.
- **`/src/redux`**: Manages deep nested state via Redux Toolkit (simulated Auth/Token tracking).

### Styling Strategy (Tailwind CSS v4 & Vanilla Extraction)

No component libraries (Shadcn, MUI) were used. The UI embraces native custom CSS Variables extracted globally inside `globals.css` driving an independent, robust Dark/Light mode theme system leveraging Tailwind V4's native `@theme` directives.

## ⚡ Performance Optimizations

1. **Explicit Next.js Images (LCP < 2.5s):** All images invoke `next/image` with predefined `fill` ratios or fixed measurements preventing absolute Cumulative Layout Shifts (`CLS < 0.1`). Note: `unoptimized={true}` was engaged because the Art Institute IIIF servers explicitly reject generic optimization proxy headers via `403 Forbidden` responses.
2. **Built-in `blurDataURL` loading states:** Artworks integrate native LQIP (Low-Quality Image Placeholders) directly sourced from the Art Institute dataset ensuring no flash blanks occur over unpredictable networks.
3. **Optimized Route Segments:** Data-heavy URL params natively invoke isolated chunk splitting.
4. **Debounced Search Indexing:** The `useSearchParams` hook is tied into a decoupled synchronous debounce wrapper, suppressing URL mutation loops and stopping network spam.

## 🎁 Bonus Features Implemented

### **B-1: Edge Caching Control (Cloudflare)**

Built directly leveraging `cf` extension attributes attached statically onto Next.js fetch API configuration params:

```js
const res = await fetch(url, {
  next: { revalidate: 3600 },
  cf: { cacheEverything: true, cacheTtl: 3600 },
});
```

This forces Cloudflare Workers environments (such as OpenNext) to aggressively edge cache the external origin API resolution.

### **B-2: React 18 Streaming (Suspense wrapped Data Fetching)**

Instead of allowing standard `loading.tsx` behavior to act implicitly, I refactored the listing core inside `page.tsx` directly into an asynchronous nested Server Component (`<ArtworkGrid />`). This executes inside a discrete native `<Suspense>` wrapper with a custom visual skeleton layout decoupled manually from the actual page navigation lifecycle.

## ⚖️ Trade-offs & Future Improvements

**Given an additional 2 hours, I would focus on:**

1. **Dynamic Open Graph Images:** I would implement `generateMetadata` specifically pointing toward Next.js `ImageResponse` routes to auto-render standard dynamic Twitter/OG preview cards containing actual visual thumbnails of paintings shared over social links.
2. **Advanced E2E Testing:** While I've implemented a suite of unit tests using Vitest (covering basic component rendering and utilities), I would integrate Playwright or Cypress to conduct cross-browser E2E checks, ensuring complex user flows like the search-and-paginate lifecycle remain robust across real edge environments.
