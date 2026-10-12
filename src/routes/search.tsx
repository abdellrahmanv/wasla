import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { categories, searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/store";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().catch(""), cat: z.string().catch("") }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Search products — WASLA" },
      { name: "description", content: "Search industrial products, materials, and equipment across all suppliers." },
      { property: "og:title", content: "Search products — WASLA" },
      { property: "og:description", content: "Search industrial products, materials, and equipment across all suppliers." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, cat } = Route.useSearch();
  const results = searchProducts(q, cat || undefined);
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[220px_1fr]">
      <aside>
        <h3 className="font-semibold">Category</h3>
        <ul className="mt-2 space-y-1 text-sm">
          <li><Link to="/search" search={{ q, cat: "" }} className={!cat ? "font-bold text-primary" : "hover:text-primary"}>All categories</Link></li>
          {categories.map((c) => (
            <li key={c.id}><Link to="/search" search={{ q, cat: c.id }} className={cat === c.id ? "font-bold text-primary" : "hover:text-primary"}>{c.name}</Link></li>
          ))}
        </ul>
      </aside>
      <div>
        <p className="text-sm text-muted-foreground">{results.length} results{q && <> for <b className="text-foreground">"{q}"</b></>}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {results.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {!results.length && <p className="mt-10 text-center text-muted-foreground">No products found. Try another search.</p>}
      </div>
    </div>
  );
}
