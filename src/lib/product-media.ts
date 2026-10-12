import alOverhead from "@/assets/products/al-overhead.png";
import batteryLfp from "@/assets/products/battery-lfp.png";
import cu25 from "@/assets/products/cu-2.5.jpg";
import cu4 from "@/assets/products/cu-4.jpg";
import inverter5k from "@/assets/products/inverter-5k.png";
import ledHighbay from "@/assets/products/led-highbay.png";
import ledPanel from "@/assets/products/led-panel.png";
import mcb32 from "@/assets/products/mcb-32.jpg";
import motor75 from "@/assets/products/motor-7.5.png";
import multimeter from "@/assets/products/multimeter.jpg";
import panel24 from "@/assets/products/panel-24.jpg";
import rccb40 from "@/assets/products/rccb-40.jpg";
import solar550 from "@/assets/products/solar-550.png";
import street100 from "@/assets/products/street-100.png";
import vfd55 from "@/assets/products/vfd-5.5.jpg";
import xlpe4x16 from "@/assets/products/xlpe-4x16.png";

export type ProductPhoto = { url: string; alt: string };

export const productPhotos: Record<string, ProductPhoto> = {
  "cu-2.5": {
    url: cu25,
    alt: "Copper Wire 2.5mm2 PVC 100m roll",
  },
  "cu-4": {
    url: cu4,
    alt: "Copper Wire 4mm2 PVC 100m roll",
  },
  "xlpe-4x16": {
    url: xlpe4x16,
    alt: "XLPE Armoured Cable 4x16mm2",
  },
  "al-overhead": {
    url: alOverhead,
    alt: "Aluminium Overhead Conductor 50mm2",
  },
  "mcb-32": {
    url: mcb32,
    alt: "MCB Circuit Breaker 32A 1P C-curve",
  },
  "rccb-40": {
    url: rccb40,
    alt: "RCCB 40A 30mA 4-Pole",
  },
  "panel-24": {
    url: panel24,
    alt: "Distribution Board 24-Way Metal",
  },
  multimeter: {
    url: multimeter,
    alt: "Digital Multimeter True-RMS CAT III",
  },
  "led-highbay": {
    url: ledHighbay,
    alt: "LED High Bay 150W 6500K",
  },
  "led-panel": {
    url: ledPanel,
    alt: "LED Panel 60x60 40W",
  },
  "street-100": {
    url: street100,
    alt: "LED Street Light 100W",
  },
  "motor-7.5": {
    url: motor75,
    alt: "3-Phase Induction Motor 7.5kW",
  },
  "vfd-5.5": {
    url: vfd55,
    alt: "Variable Frequency Drive 5.5kW",
  },
  "solar-550": {
    url: solar550,
    alt: "Mono Solar Panel 550W",
  },
  "inverter-5k": {
    url: inverter5k,
    alt: "Hybrid Solar Inverter 5kW",
  },
  "battery-lfp": {
    url: batteryLfp,
    alt: "LiFePO4 Battery 48V 100Ah",
  },
};
