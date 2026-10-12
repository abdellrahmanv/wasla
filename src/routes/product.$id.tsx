import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { formatEGP, getProduct, getSupplier, products } from "@/lib/data";
import { ProductArt, ProductCard, Stars } from "@/components/store";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.p.name} — WASLA`;
    return { meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: t }, { name: "description", content: loaderData.p.description }, { property: "og:title", content: t }, { property: "og:description", content: loaderData.p.description }] };
  },
  notFoundComponent: () => <p className="p-10 text-center">Product not found.</p>,
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useLoaderData();
  const s = getSupplier(p.supplierId)!;
  const { add } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(p.minOrder);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr_320px]">
        <ProductArt p={p} big />
        <div>
          <h1 className="font-display text-2xl font-bold">{p.name}</h1>
          <Link to="/suppliers/$id" params={{ id: s.id }} className="text-sm text-primary hover:underline">Visit {s.name}</Link>
          <div className="mt-1"><Stars value={p.rating} reviews={p.reviews} /></div>
          <hr className="my-4" />
          <div className="text-3xl font-bold">{formatEGP(p.price)} <span className="text-base font-normal text-muted-foreground">/ {p.unit}</span></div>
          <p className="mt-4">{p.description}</p>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {p.specs.map(([k, v]) => (
                <tr key={k} className="border-b"><td className="py-2 font-medium text-muted-foreground">{k}</td><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-fit rounded-xl border bg-card p-5">
          <div className="text-2xl font-bold">{formatEGP(p.price * qty)}</div>
          <p className={`mt-1 text-sm font-medium ${p.stock > 0 ? "text-success" : "text-destructive"}`}>{p.stock > 0 ? `In stock (${p.stock})` : "Out of stock"}</p>
          <p className="text-xs text-muted-foreground">Minimum order: {p.minOrder} {p.unit}</p>
          <label className="mt-4 block text-sm font-medium">Quantity
            <input type="number" min={p.minOrder} max={p.stock} value={qty} onChange={(e) => setQty(Math.max(p.minOrder, Number(e.target.value) || p.minOrder))} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
          </label>
          <button onClick={() => { add(p.id, qty); toast.success("Added to cart"); }} className="mt-4 w-full rounded-full bg-brand py-2.5 font-semibold text-brand-foreground">Add to cart</button>
          <button onClick={() => { add(p.id, qty); nav({ to: "/checkout" }); }} className="mt-2 w-full rounded-full bg-primary py-2.5 font-semibold text-primary-foreground">Buy now</button>
          <p className="mt-3 text-xs text-muted-foreground">Sold & shipped by {s.name}</p>
        </div>
      </div>
      {related.length > 0 && (
        <>
          <h2 className="mt-12 font-display text-xl font-bold">Related products</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </>
      )}
    </div>
  );
}
