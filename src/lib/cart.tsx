import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./data";

type Line = { id: string; qty: number };
type Ctx = {
  lines: Line[];
  add: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try {
      const s = localStorage.getItem("cart");
      if (s) setLines(JSON.parse(s));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(lines));
  }, [lines]);

  const add = (id: string, qty: number) =>
    setLines((l) => {
      const e = l.find((x) => x.id === id);
      return e ? l.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x)) : [...l, { id, qty }];
    });
  const setQty = (id: string, qty: number) =>
    setLines((l) => l.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  const remove = (id: string) => setLines((l) => l.filter((x) => x.id !== id));
  const clear = () => setLines([]);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + (getProduct(l.id)?.price ?? 0) * l.qty, 0);

  return (
    <CartCtx.Provider value={{ lines, add, setQty, remove, clear, count, total }}>{children}</CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
