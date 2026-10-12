import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { formatEGP, getProduct, getSupplier } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { ProductArt } from "@/components/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Your cart — WASLA" },
      { name: "description", content: "Review the industrial products in your cart." },
      { property: "og:title", content: "Your cart — WASLA" },
      { property: "og:description", content: "Review your procurement cart on WASLA." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, total, count } = useCart();
  if (!lines.length)
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
        <Link to="/search" search={{ q: "", cat: "" }} className="mt-4 inline-block rounded-full bg-brand px-6 py-2.5 font-semibold text-brand-foreground">Start shopping</Link>
      </div>
    );
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-card p-5">
        <h1 className="font-display text-2xl font-bold">Shopping cart</h1>
        {lines.map((l) => {
          const p = getProduct(l.id);
          if (!p) return null;
          return (
            <div key={l.id} className="flex gap-4 border-b py-4">
              <div className="w-28 shrink-0"><ProductArt p={p} /></div>
              <div className="min-w-0 flex-1">
                <Link to="/product/$id" params={{ id: p.id }} className="font-medium hover:text-primary">{p.name}</Link>
                <div className="text-xs text-muted-foreground">by {getSupplier(p.supplierId)?.name}</div>
                <div className="mt-2 flex items-center gap-3">
                  <input type="number" min={p.minOrder} value={l.qty} onChange={(e) => setQty(p.id, Math.max(p.minOrder, Number(e.target.value)))} className="w-20 rounded-md border bg-background px-2 py-1" />
                  <button onClick={() => remove(p.id)} className="flex items-center gap-1 text-sm text-destructive"><Trash2 className="h-4 w-4" />Remove</button>
                </div>
              </div>
              <div className="font-bold">{formatEGP(p.price * l.qty)}</div>
            </div>
          );
        })}
      </div>
      <div className="h-fit rounded-xl border bg-card p-5">
        <div className="text-lg">Subtotal ({count} items): <b>{formatEGP(total)}</b></div>
        <Link to="/checkout" className="mt-4 block rounded-full bg-brand py-2.5 text-center font-semibold text-brand-foreground">Proceed to checkout</Link>
      </div>
    </div>
  );
}
