export type Category = "wires" | "lighting" | "switchgear" | "tools" | "motors" | "solar";

export const categories: { id: Category; name: string }[] = [
  { id: "wires", name: "Wires & Cables" },
  { id: "lighting", name: "Lighting" },
  { id: "switchgear", name: "Switchgear & Breakers" },
  { id: "tools", name: "Tools & Testers" },
  { id: "motors", name: "Motors & Drives" },
  { id: "solar", name: "Solar & Power" },
];

export type Supplier = {
  id: string;
  name: string;
  city: string;
  since: number;
  rating: number;
  tagline: string;
  specialties: Category[];
};

export const suppliers: Supplier[] = [
  { id: "nilecable", name: "Nile Cable Works", city: "Cairo", since: 1998, rating: 4.8, tagline: "Copper & aluminium cables for industry and housing.", specialties: ["wires"] },
  { id: "voltline", name: "VoltLine Industrial", city: "Alexandria", since: 2005, rating: 4.6, tagline: "Breakers, panels and protection gear.", specialties: ["switchgear", "tools"] },
  { id: "lumina", name: "Lumina Lighting Co.", city: "6th of October", since: 2011, rating: 4.7, tagline: "LED lighting for factories, offices and streets.", specialties: ["lighting"] },
  { id: "deltamotors", name: "Delta Motors & Drives", city: "Tenth of Ramadan", since: 2002, rating: 4.5, tagline: "Electric motors, inverters and pumps.", specialties: ["motors"] },
  { id: "sunforge", name: "SunForge Energy", city: "Aswan", since: 2016, rating: 4.9, tagline: "Solar panels, inverters and batteries.", specialties: ["solar"] },
];

export type Product = {
  id: string;
  name: string;
  supplierId: string;
  category: Category;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  stock: number;
  minOrder: number;
  description: string;
  specs: [string, string][];
};

export const products: Product[] = [
  { id: "cu-2.5", name: "Copper Wire 2.5mm² PVC — 100m roll", supplierId: "nilecable", category: "wires", price: 1450, unit: "roll", rating: 4.8, reviews: 312, stock: 420, minOrder: 1, description: "Single-core annealed copper conductor with PVC insulation for building wiring.", specs: [["Cross section", "2.5 mm²"], ["Length", "100 m"], ["Voltage", "450/750 V"], ["Standard", "IEC 60227"]] },
  { id: "cu-4", name: "Copper Wire 4mm² PVC — 100m roll", supplierId: "nilecable", category: "wires", price: 2280, unit: "roll", rating: 4.7, reviews: 188, stock: 260, minOrder: 1, description: "Heavy-duty copper wire for sockets, AC units and kitchen circuits.", specs: [["Cross section", "4 mm²"], ["Length", "100 m"], ["Voltage", "450/750 V"]] },
  { id: "xlpe-4x16", name: "XLPE Armoured Cable 4×16mm² — per metre", supplierId: "nilecable", category: "wires", price: 395, unit: "metre", rating: 4.9, reviews: 74, stock: 5000, minOrder: 50, description: "Steel-wire armoured power cable for underground and industrial feeders.", specs: [["Cores", "4"], ["Cross section", "16 mm²"], ["Insulation", "XLPE"], ["Voltage", "0.6/1 kV"]] },
  { id: "al-overhead", name: "Aluminium Overhead Conductor 50mm²", supplierId: "nilecable", category: "wires", price: 62, unit: "metre", rating: 4.4, reviews: 41, stock: 12000, minOrder: 200, description: "Bare aluminium conductor for overhead distribution lines.", specs: [["Material", "AAC"], ["Cross section", "50 mm²"]] },
  { id: "mcb-32", name: "MCB Circuit Breaker 32A 1P C-curve", supplierId: "voltline", category: "switchgear", price: 145, unit: "piece", rating: 4.6, reviews: 529, stock: 1800, minOrder: 10, description: "Miniature circuit breaker for residential and commercial boards.", specs: [["Rating", "32 A"], ["Poles", "1"], ["Breaking capacity", "6 kA"]] },
  { id: "rccb-40", name: "RCCB 40A 30mA 4-Pole", supplierId: "voltline", category: "switchgear", price: 890, unit: "piece", rating: 4.7, reviews: 203, stock: 340, minOrder: 1, description: "Residual current device protecting people from electric shock.", specs: [["Rating", "40 A"], ["Sensitivity", "30 mA"], ["Poles", "4"]] },
  { id: "panel-24", name: "Distribution Board 24-Way Metal", supplierId: "voltline", category: "switchgear", price: 2150, unit: "piece", rating: 4.5, reviews: 96, stock: 75, minOrder: 1, description: "Powder-coated steel distribution board with DIN rail and busbars.", specs: [["Ways", "24"], ["IP rating", "IP40"]] },
  { id: "multimeter", name: "Digital Multimeter True-RMS CAT III", supplierId: "voltline", category: "tools", price: 1250, unit: "piece", rating: 4.8, reviews: 412, stock: 150, minOrder: 1, description: "Professional multimeter for voltage, current, resistance and continuity.", specs: [["Category", "CAT III 600V"], ["Display", "6000 count"]] },
  { id: "led-highbay", name: "LED High Bay 150W 6500K", supplierId: "lumina", category: "lighting", price: 1780, unit: "piece", rating: 4.7, reviews: 267, stock: 300, minOrder: 4, description: "Bright, efficient lighting for warehouses and factory floors.", specs: [["Power", "150 W"], ["Lumens", "21,000 lm"], ["IP rating", "IP65"]] },
  { id: "led-panel", name: "LED Panel 60×60 40W", supplierId: "lumina", category: "lighting", price: 420, unit: "piece", rating: 4.5, reviews: 610, stock: 2200, minOrder: 10, description: "Slim ceiling panel for offices, schools and clinics.", specs: [["Power", "40 W"], ["Size", "600×600 mm"]] },
  { id: "street-100", name: "LED Street Light 100W", supplierId: "lumina", category: "lighting", price: 2350, unit: "piece", rating: 4.6, reviews: 58, stock: 120, minOrder: 2, description: "Die-cast aluminium street luminaire with surge protection.", specs: [["Power", "100 W"], ["IP rating", "IP66"]] },
  { id: "motor-7.5", name: "3-Phase Induction Motor 7.5kW", supplierId: "deltamotors", category: "motors", price: 18900, unit: "piece", rating: 4.6, reviews: 37, stock: 22, minOrder: 1, description: "IE3 efficiency motor for pumps, fans and conveyors.", specs: [["Power", "7.5 kW"], ["Speed", "1450 rpm"], ["Efficiency", "IE3"]] },
  { id: "vfd-5.5", name: "Variable Frequency Drive 5.5kW", supplierId: "deltamotors", category: "motors", price: 9800, unit: "piece", rating: 4.5, reviews: 52, stock: 40, minOrder: 1, description: "Speed control for 3-phase motors with built-in PID.", specs: [["Power", "5.5 kW"], ["Input", "380 V 3-phase"]] },
  { id: "solar-550", name: "Mono Solar Panel 550W", supplierId: "sunforge", category: "solar", price: 5200, unit: "panel", rating: 4.9, reviews: 144, stock: 600, minOrder: 2, description: "High-efficiency monocrystalline half-cut panel.", specs: [["Power", "550 W"], ["Efficiency", "21.3%"]] },
  { id: "inverter-5k", name: "Hybrid Solar Inverter 5kW", supplierId: "sunforge", category: "solar", price: 24500, unit: "piece", rating: 4.8, reviews: 66, stock: 35, minOrder: 1, description: "On/off-grid hybrid inverter with MPPT charger.", specs: [["Power", "5 kW"], ["MPPT", "2 trackers"]] },
  { id: "battery-lfp", name: "LiFePO4 Battery 48V 100Ah", supplierId: "sunforge", category: "solar", price: 39000, unit: "piece", rating: 4.7, reviews: 29, stock: 18, minOrder: 1, description: "Long-life lithium battery for solar storage systems.", specs: [["Voltage", "48 V"], ["Capacity", "100 Ah"], ["Cycles", "6000+"]] },
];

export const getSupplier = (id: string) => suppliers.find((s) => s.id === id);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const formatEGP = (n: number) => `EGP ${n.toLocaleString("en-US")}`;

export function searchProducts(q: string, cat?: string) {
  const t = q.trim().toLowerCase();
  return products.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (!t) return true;
    const s = getSupplier(p.supplierId)?.name ?? "";
    return `${p.name} ${p.description} ${s} ${p.category}`.toLowerCase().includes(t);
  });
}
