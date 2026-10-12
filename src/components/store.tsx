import { Link, useNavigate } from "@tanstack/react-router";
import { Cable, Lightbulb, ToggleRight, Wrench, Cog, Sun, Search, ShoppingCart, Star, Link2 } from "lucide-react";
import { useState } from "react";
import { categories, formatEGP, getSupplier, type Category, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { productPhotos } from "@/lib/product-media";

export const catIcon: Record<Category, typeof Cable> = {
  wires: Cable, lighting: Lightbulb, switchgear: ToggleRight, tools: Wrench, motors: Cog, solar: Sun,
};

export function Header() {
  const { count } = useCart();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-header text-header-foreground">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-1.5 font-display text-xl font-bold">
            <Link2 className="h-6 w-6 text-brand" /> <span className="text-brand">WASLA</span>
          </Link>
          <form
            className="flex min-w-0 flex-1 overflow-hidden rounded-md ring-2 ring-transparent focus-within:ring-brand"
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/search", search: { q, cat } }); }}
          >
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="hidden bg-muted px-2 text-sm text-foreground sm:block">
              <option value="">All</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, materials, machinery, suppliers…" className="min-w-0 flex-1 bg-card px-3 py-2 text-foreground outline-none" />
            <button className="bg-brand px-4 text-brand-foreground" aria-label="Search"><Search className="h-5 w-5" /></button>
          </form>
          <Link to="/suppliers" className="hidden text-sm font-medium hover:text-brand md:block">Suppliers</Link>
          <Link to="/cart" className="relative flex shrink-0 items-center gap-1 hover:text-brand">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 rounded-full bg-brand px-1.5 text-xs font-bold text-brand-foreground">{count}</span>
          </Link>
        </div>
      </div>
      <nav className="bg-subheader text-header-foreground">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-2 text-sm">
          {categories.map((c) => (
            <Link key={c.id} to="/search" search={{ q: "", cat: c.id }} className="whitespace-nowrap opacity-90 hover:text-brand">{c.name}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function Stars({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-4 w-4 ${i <= Math.round(value) ? "fill-brand text-brand" : "text-border"}`} />
      ))}
      {reviews !== undefined && <span className="text-muted-foreground">({reviews})</span>}
    </div>
  );
}

export function ProductArt({ p, big }: { p: Product; big?: boolean }) {
  const Icon = catIcon[p.category];
  const photo = productPhotos[p.id];
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-lg ${photo ? "bg-product-photo" : "bg-art"} ${big ? "aspect-square" : "aspect-[4/3]"}`}>
      {photo ? (
        <img src={photo.url} alt={photo.alt} loading={big ? "eager" : "lazy"} decoding="async" className={`absolute inset-0 h-full w-full object-contain ${big ? "p-6" : "p-3"}`} />
      ) : <Icon className={`${big ? "h-40 w-40" : "h-16 w-16"} text-primary`} strokeWidth={1.25} />}
    </div>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const s = getSupplier(p.supplierId);
  return (
    <div className="flex flex-col rounded-xl border bg-card p-3 transition hover:shadow-card">
      <Link to="/product/$id" params={{ id: p.id }}><ProductArt p={p} /></Link>
      <Link to="/product/$id" params={{ id: p.id }} className="mt-3 line-clamp-2 font-medium hover:text-primary">{p.name}</Link>
      <Link to="/suppliers/$id" params={{ id: p.supplierId }} className="text-xs text-muted-foreground hover:underline">by {s?.name}</Link>
      <Stars value={p.rating} reviews={p.reviews} />
      <div className="mt-1 text-lg font-bold">{formatEGP(p.price)} <span className="text-xs font-normal text-muted-foreground">/ {p.unit}</span></div>
      <div className="text-xs text-muted-foreground">Min. order {p.minOrder}</div>
      <button
        onClick={() => { add(p.id, p.minOrder); toast.success("Added to cart"); }}
        className="mt-auto mt-3 rounded-full bg-brand py-2 text-sm font-semibold text-brand-foreground hover:opacity-90"
      >Add to cart</button>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-header py-10 text-header-foreground">
      <div className="mx-auto max-w-7xl px-4 text-sm opacity-80">
        © 2026 WASLA — The connected network for industry, supply, and manufacturing.
      </div>
    </footer>
  );
}
