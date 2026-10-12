import { createFileRoute, notFound } from "@tanstack/react-router";
import { getSupplier, products } from "@/lib/data";
import { ProductCard, Stars } from "@/components/store";

export const Route = createFileRoute("/suppliers/$id")({
  loader: ({ params }) => {
    const s = getSupplier(params.id);
    if (!s) throw notFound();
    return { s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Supplier not found" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.s.name} — WASLA`;
    return { meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { title: t }, { name: "description", content: loaderData.s.tagline }, { property: "og:title", content: t }, { property: "og:description", content: loaderData.s.tagline }] };
  },
  notFoundComponent: () => <p className="p-10 text-center">Supplier not found.</p>,
  component: SupplierPage,
});

function SupplierPage() {
  const { s } = Route.useLoaderData();
  const list = products.filter((p) => p.supplierId === s.id);
  return (
    <div>
      <div className="bg-hero text-header-foreground">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-10">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand font-display text-2xl font-bold text-brand-foreground">{s.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <h1 className="font-display text-3xl font-bold">{s.name}</h1>
            <p className="opacity-85">{s.tagline}</p>
            <div className="mt-1 flex items-center gap-3 text-sm opacity-85"><Stars value={s.rating} /> {s.city} · since {s.since}</div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="font-display text-xl font-bold">Products ({list.length})</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </div>
    </div>
  );
}
