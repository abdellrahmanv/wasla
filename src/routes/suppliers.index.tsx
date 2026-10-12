import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products, suppliers } from "@/lib/data";
import { Stars } from "@/components/store";

export const Route = createFileRoute("/suppliers/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Suppliers — WASLA" },
      { name: "description", content: "Verified industrial manufacturers, suppliers, and distributors on WASLA." },
      { property: "og:title", content: "Suppliers — WASLA" },
      { property: "og:description", content: "Verified industrial manufacturers and suppliers on WASLA." },
    ],
  }),
  component: Suppliers,
});

function Suppliers() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Our suppliers</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {suppliers.map((s) => (
          <Link key={s.id} to="/suppliers/$id" params={{ id: s.id }} className="flex gap-4 rounded-xl border bg-card p-5 hover:shadow-card">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground">{s.name.slice(0, 2).toUpperCase()}</div>
            <div className="min-w-0">
              <div className="text-lg font-semibold">{s.name}</div>
              <div className="text-sm text-muted-foreground">{s.city} · since {s.since} · {products.filter((p) => p.supplierId === s.id).length} products</div>
              <Stars value={s.rating} />
              <p className="mt-1 text-sm">{s.tagline}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {s.specialties.map((c) => <span key={c} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{categories.find((x) => x.id === c)?.name}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
