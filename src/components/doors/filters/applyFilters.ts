// src/components/doors/filters/applyFilters.ts
import type { DoorProduct, Filters } from "./types";

export function applyFilters(
  products: DoorProduct[],
  filters: Filters
): DoorProduct[] {
  return products.filter((p) => {
    if (
      filters.availability.length &&
      !filters.availability.includes(p.availability)
    ) return false;

    if (filters.styles.length && !filters.styles.includes(p.style))
      return false;

    if (
      filters.doorTypes.length &&
      !filters.doorTypes.includes(p.doorType)
    ) return false;

    if (
      p.widthIn < filters.widthRange[0] ||
      p.widthIn > filters.widthRange[1]
    ) return false;

    if (
      p.heightIn < filters.heightRange[0] ||
      p.heightIn > filters.heightRange[1]
    ) return false;

    if (filters.glass.length && !filters.glass.includes(p.glass))
      return false;

    if (filters.shapes.length && !filters.shapes.includes(p.shape))
      return false;

    if (filters.thermal.length) {
      const t = p.thermal ? "Yes" : "No";
      if (!filters.thermal.includes(t)) return false;
    }

    if (filters.onSale.length) {
      const s = p.onSale ? "Yes" : "No";
      if (!filters.onSale.includes(s)) return false;
    }

    return true;
  });
}
