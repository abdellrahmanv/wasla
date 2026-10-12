import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products, suppliers } from "@/lib/data";
import { catIcon, ProductCard, Stars } from "@/components/store";
import { Truck, ShieldCheck, Factory } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "WASLA — Industrial B2B Marketplace" },
      { name: "description", content: "Source industrial equipment, raw materials, and supplies from verified manufacturers and suppliers worldwide." },
      { property: "og:title", content: "WASLA — Industrial B2B Marketplace" },
      { property: "og:description", content: "Connect with manufacturers, suppliers, and industrial buyers on one unified platform." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="bg-hero text-header-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-semibold uppercase tracking-widest text-brand">B2B Industrial Marketplace</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">Connect. Supply. Build.</h1>
            <p className="mt-4 max-w-md opacity-85">Machinery, raw materials, and industrial equipment — from {suppliers.length} verified manufacturers and suppliers.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/search" search={{ q: "", cat: "" }} className="rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground">Shop all products</Link>
              <Link to="/suppliers" className="rounded-full border border-header-foreground/40 px-6 py-3 font-semibold">Meet suppliers</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 self-center">
            {categories.map((c) => {
              const I = catIcon[c.id];
              return (
                <Link key={c.id} to="/search" search={{ q: "", cat: c.id }} className="flex flex-col items-center gap-2 rounded-xl bg-header-foreground/10 p-4 text-center text-sm transition hover:bg-header-foreground/20">
                  <I className="h-8 w-8 text-brand" />{c.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <div className="-mt-6 grid gap-3 rounded-xl border bg-card p-4 shadow-card sm:grid-cols-3">
          {[[Truck, "Fast delivery to sites & factories"], [ShieldCheck, "Certified, genuine products"], [Factory, "Buy direct from manufacturers"]].map(([I, t], i) => {
            const Icon = I as typeof Truck;
            return <div key={i} className="flex items-center gap-3 text-sm font-medium"><Icon className="h-6 w-6 text-primary" />{t as string}</div>;
          })}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold">Best sellers</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold">Featured suppliers</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {suppliers.map((s) => (
            <Link key={s.id} to="/suppliers/$id" params={{ id: s.id }} className="rounded-xl border bg-card p-4 hover:shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">{s.name.slice(0, 2).toUpperCase()}</div>
              <div className="mt-3 font-semibold">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.city}</div>
              <Stars value={s.rating} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
