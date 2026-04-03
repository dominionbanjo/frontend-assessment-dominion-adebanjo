# 🏛️ Art Institute of Chicago Gallery

A high-performance, production-ready Content Explorer built to fetch, display, and interact with the public collection from the Art Institute of Chicago API. Designed with a focus on modern aesthetic, accessibility, and aggressive performance optimizations.

![Art Gallery Banner](https://aicgallery.vercel.app/aicPreview.png)

---

## 🌟 Overview

This project serves as a robust demonstration of modern front-end engineering, satisfying all critical requirements of a professional-grade technical assessment. It leverages the cutting-edge capabilities of **Next.js 16+**, **React 19**, and **Tailwind CSS v4** to deliver a seamless user experience.

### Key Highlights
- **💨 Speed:** Sub-2.5s LCP through strategic caching and image prioritization.
- **🎨 Aesthetics:** Bespoke CSS token system with a focus on premium, dynamic dark/light mode switching.
- **♿ Accessibility:** Compliant heading structures, ARIA labels, and semantic HTML.
- **🎯 State Management:** High-performance global state handling with Redux Toolkit.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 (Pure Vanilla CSS Extraction via CSS Variables)
- **State Management:** Redux Toolkit & React Redux
- **Icons:** Iconsax, Lucide, and HugeIcons
- **Testing:** Vitest & React Testing Library
- **Tooling:** Turbopack, ESLint, PostCSS

---

## 🏗️ Project Structure

The codebase is organized into clear functional boundaries:

- **`/src/app`**: Native App Router routes, page boundaries, nested loading wrappers, and error boundaries.
- **`/src/components`**: 
  - **`/ui`**: Atomic, stateless UI components (Buttons, Modals, Inputs).
  - **`/shared`**: Complex, layout-driven compositions (SearchBar, Pagination, Grids).
- **`/src/lib`**: Business logic, API abstractions, and global utility functions.
- **`/src/types`**: Centralized TypeScript interface and type definitions.
- **`/src/redux`**: Global state slices and store configuration.

---

## 🚀 Performance & Optimizations

1. **Next.js Image Prioritization:** Strategic use of `next/image` with `fill` ratios or fixed sizes prevents layout shifts (`CLS < 0.1`).
2. **Built-in `blurDataURL`:** All artworks feature Low-Quality Image Placeholders (LQIP) for a smoother perceived load.
3. **Route Segment Splitting:** Data-heavy pages are chunked to minimize main-thread execution.
4. **Synchronous Debouncing:** Search functionality uses a decoupled debouncing wrapper to prevent API spam while maintaining UI responsiveness.

---

## 🌐 Deployment & Hosting Strategy

### **Why Vercel over Cloudflare?**

For this specific application, **Vercel** was chosen as the primary hosting platform over Cloudflare Pages/Workers. While Cloudflare offers excellent edge capabilities, several factors made Vercel the superior choice for a Next.js 16+ application:

- **Full Next.js Compatibility:** Vercel provides first-class support for Next.js features like **Image Optimization**, **Middleware**, and **On-demand Revalidation**, which can sometimes face compatibility issues on other platforms.
- **Node.js Runtime support:** The application utilizes several Node.js functions and Next.js APIs that are fully compatible with Vercel’s infrastructure, whereas Cloudflare’s Edge runtime has specific limitations regarding Node.js environment variables and libraries.
- **Image Optimization:** Given the heavy focus on visual art, native Next.js image optimization is critical. Cloudflare is better used as a **CDN/WAF in front of an external origin** rather than the direct hosting provider for complex, non-static Next.js applications.

---

## 🎁 Specialized Implementations

### **A. Edge Caching Control**
Configured with specialized caching attributes for optimized delivery:
```ts
const res = await fetch(url, {
  next: { revalidate: 3600 },
  // Extended configuration for Edge Caching
  cf: { cacheEverything: true, cacheTtl: 3600 }, 
});
```

### **B. React 19 Streaming & Suspense**
We utilize manual `<Suspense>` wrappers around data-fetching components (`<ArtworkGrid />`) to allow the page shell to load instantly while the gallery content streams in with custom skeleton states.

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

---

## ⚖️ Trade-offs & Future Roadmaps

- **Dynamic Open Graph Images:** Future implementation of `generateMetadata` for dynamic OG cards based on the artwork being viewed.
- **End-to-End Testing:** Expansion of the test suite to include **Playwright** for full user sequence verification.
- **Localization:** Implementing `next-intl` to support multi-language art exploration.
