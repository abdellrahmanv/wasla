import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { formatEGP, getProduct } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Checkout — WASLA" },
      { name: "description", content: "Complete your industrial procurement order on WASLA." },
      { property: "og:title", content: "Checkout — WASLA" },
      { property: "og:description", content: "Complete your procurement order on WASLA." },
    ],
  }),
  component: Checkout,
});

const SHIPPING = 150;

function Checkout() {
  const { lines, total, clear } = useCart();
  const [done, setDone] = useState<string | null>(null);

  if (done)
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-4 font-display text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 text-muted-foreground">Order number <b className="text-foreground">{done}</b>. Suppliers will contact you to confirm delivery.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 font-semibold text-brand-foreground">Continue shopping</Link>
      </div>
    );

  if (!lines.length)
    return <div className="p-20 text-center">Your cart is empty. <Link to="/" className="text-primary underline">Go shopping</Link></div>;

  const field = "mt-1 w-full rounded-md border bg-background px-3 py-2";
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setDone("WS-" + Math.floor(100000 + Math.random() * 900000)); clear(); }}
      className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_340px]"
    >
      <div className="space-y-4 rounded-xl border bg-card p-5">
        <h1 className="font-display text-2xl font-bold">Checkout</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Full name<input required className={field} /></label>
          <label className="text-sm font-medium">Company (optional)<input className={field} /></label>
          <label className="text-sm font-medium">Phone<input required type="tel" className={field} /></label>
          <label className="text-sm font-medium">Email<input required type="email" className={field} /></label>
        </div>
        <label className="block text-sm font-medium">Delivery address<textarea required rows={3} className={field} /></label>
        <fieldset className="text-sm">
          <legend className="font-medium">Payment method</legend>
          <label className="mt-2 flex items-center gap-2"><input type="radio" name="pay" defaultChecked /> Cash on delivery</label>
          <label className="mt-1 flex items-center gap-2"><input type="radio" name="pay" /> Bank transfer</label>
        </fieldset>
      </div>
      <div className="h-fit rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Order summary</h2>
        {lines.map((l) => {
          const p = getProduct(l.id)!;
          return <div key={l.id} className="mt-2 flex justify-between gap-2 text-sm"><span className="min-w-0 truncate">{l.qty} × {p.name}</span><span className="shrink-0">{formatEGP(p.price * l.qty)}</span></div>;
        })}
        <hr className="my-3" />
        <div className="flex justify-between text-sm"><span>Shipping</span><span>{formatEGP(SHIPPING)}</span></div>
        <div className="mt-2 flex justify-between text-lg font-bold"><span>Total</span><span>{formatEGP(total + SHIPPING)}</span></div>
        <button className="mt-4 w-full rounded-full bg-brand py-2.5 font-semibold text-brand-foreground">Place order</button>
      </div>
    </form>
  );
}
