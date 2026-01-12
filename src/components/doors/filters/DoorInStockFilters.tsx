// src/components/doors/filters/DoorInStockFilters.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import type { DoorProduct, Filters } from "./types";
import { applyFilters } from "./applyFilters";
import { AccordionSection } from "./ui/AccordionSection";
import { RangeSliderPro } from "./ui/RangeSliderPro";
import { ResetIcon } from "./ui/ResetIcon";
import {
  BASE_FACETS,
  type FacetConfig,
  type MultiSelectField,
  type RangeField,
} from "./facetSchema";

/* =========================================================
 * Default Filters
 * ========================================================= */
const DEFAULT_FILTERS: Filters = {
  availability: [],
  styles: [],
  doorTypes: [],
  glass: [],
  shapes: [],
  thermal: [],
  onSale: [],
  widthRange: [30, 80],
  heightRange: [72, 120],
};

/* =========================================================
 * Helpers（强类型映射，无 any）
 * ========================================================= */

// multi-select
function getMultiSelectValues(filters: Filters, field: MultiSelectField): string[] {
  return filters[field];
}

function toggleMultiSelectValue(
  prev: Filters,
  field: MultiSelectField,
  value: string
): Filters {
  const list = prev[field] as unknown as string[];
  const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return {
    ...prev,
    [field]: next as never, // ✅ 写回 union-array（不丢类型）
  };
}

// range
function getRangeValue(filters: Filters, field: RangeField): [number, number] {
  switch (field) {
    case "widthIn":
      return filters.widthRange;
    case "heightIn":
      return filters.heightRange;
  }
}

function setRangeValue(prev: Filters, field: RangeField, range: [number, number]): Filters {
  switch (field) {
    case "widthIn":
      return { ...prev, widthRange: range };
    case "heightIn":
      return { ...prev, heightRange: range };
  }
}

/* =========================================================
 * Component
 * ========================================================= */
export function DoorInStockFilters({
  products,
  onFilteredChange,
  facets = BASE_FACETS,
}: {
  products: DoorProduct[];
  onFilteredChange?: (filtered: DoorProduct[]) => void;
  facets?: FacetConfig[];
}) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  // ✅ open 不需要“补齐 effect”
  // 新增 facet.key 时：open[key] 取不到 -> 默认 true
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(
    () => applyFilters(products, filters),
    [products, filters]
  );

  useEffect(() => {
    onFilteredChange?.(filteredProducts);
  }, [filteredProducts, onFilteredChange]);

  const hasActiveFilters = useMemo(() => {
    // 你原来只判断 availability/width，这里升级为“全量判断”
    return JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);
  }, [filters]);

  const reset = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="space-y-4">
      {facets.map((facet) => {
        const isOpen = open[facet.key] ?? true;

        if (facet.type === "multi-select") {
          const field = facet.field as MultiSelectField;
          const selected = getMultiSelectValues(filters, field);
          const options = facet.options ?? [];

          return (
            <AccordionSection
              key={facet.key}
              title={facet.label}
              isOpen={isOpen}
              toggle={() =>
                setOpen((p) => ({ ...p, [facet.key]: !(p[facet.key] ?? true) }))
              }
            >
              {options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-400"
                    checked={selected.includes(opt)}
                    onChange={() =>
                      setFilters((prev) => toggleMultiSelectValue(prev, field, opt))
                    }
                  />
                  <span className="text-sm text-neutral-800">{opt}</span>
                </label>
              ))}
            </AccordionSection>
          );
        }

        // range
        const field = facet.field as RangeField;
        const min = facet.min ?? 0;
        const max = facet.max ?? 100;
        const value = getRangeValue(filters, field);

        return (
          <AccordionSection
            key={facet.key}
            title={facet.label}
            isOpen={isOpen}
            toggle={() =>
              setOpen((p) => ({ ...p, [facet.key]: !(p[facet.key] ?? true) }))
            }
          >
            <RangeSliderPro
              min={min}
              max={max}
              value={value}
              onChange={(v) => setFilters((prev) => setRangeValue(prev, field, v))}
            />
          </AccordionSection>
        );
      })}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800"
        >
          <ResetIcon />
          Clear all filters
        </button>
      )}
    </div>
  );
}
