# WASLA — B2B Industrial Marketplace

**WASLA** is a modern global B2B industrial marketplace connecting manufacturers, factories, suppliers, raw-material providers, machinery distributors, and industrial buyers through one unified platform.

> *The connected network for industry, supply, and manufacturing.*

---

## Features

- 🏭 Browse products across multiple industrial categories
- 🔍 Search and filter by category and keyword
- 🏢 Verified supplier profiles and storefronts
- 🛒 Cart and checkout with order confirmation
- 📱 Fully responsive — desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [TanStack Start](https://tanstack.com/start) (React SSR) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Bundler | Vite |
| Testing | Vitest |

## Color Palette

| Token | Color | Hex |
|-------|-------|-----|
| Primary | Deep Navy | `#102A43` |
| Brand / CTA | Electric Blue | `#2563EB` |
| Background | White | `#FFFFFF` |
| Surface | Cool Gray | `#E5E7EB` |
| Secondary Text | Slate | `#64748B` |

## Getting Started

You need **Node.js** + **npm**, or **Bun**.

```sh
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
├── components/       # Shared UI components (Header, Footer, ProductCard…)
│   └── ui/           # shadcn/ui base components
├── lib/              # Data, cart context, utilities
├── routes/           # File-based routes (TanStack Router)
│   ├── index.tsx     # Homepage
│   ├── search.tsx    # Product search
│   ├── product.$id.tsx
│   ├── suppliers/
│   └── cart / checkout
├── styles.css        # Global design system & brand tokens
└── assets/           # Product images
```

## License

MIT
