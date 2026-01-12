// src/components/doors/filters/facetSchema.ts
import type {
  Availability,
  Style,
  DoorType,
  Glass,
  Shape,
} from "./types";

/* =========================================================
 * Field Types（关键：不再用 string）
 * ========================================================= */

// multi-select 对应 Filters 中的数组字段
export type MultiSelectField =
  | "availability"
  | "styles"
  | "doorTypes"
  | "glass"
  | "shapes"
  | "thermal"
  | "onSale";

// range 对应 DoorProduct 字段，但映射到 Filters 的 *Range
export type RangeField =
  | "widthIn"
  | "heightIn";

export type FacetField = MultiSelectField | RangeField;

export type FacetType = "multi-select" | "range";

/* =========================================================
 * Facet Config
 * ========================================================= */
export type FacetConfig = {
  key: string;
  label: string;
  type: FacetType;
  field: FacetField;
  options?: readonly string[];
  min?: number;
  max?: number;
  unit?: string;
};

/* =========================================================
 * Base Facets（全站通用，可被 category 覆盖）
 * ========================================================= */
export const BASE_FACETS: FacetConfig[] = [
  {
    key: "availability",
    label: "Availability",
    type: "multi-select",
    field: "availability",
    options: ["Now", "6-8 weeks"] satisfies Availability[],
  },
  {
    key: "styles",
    label: "Style",
    type: "multi-select",
    field: "styles",
    options: ["Modern", "Transitional", "Traditional"] satisfies Style[],
  },
  {
    key: "doorTypes",
    label: "Door Type",
    type: "multi-select",
    field: "doorTypes",
    options: [
      "Single door",
      "Double door",
      "Doors with Sidelight",
      "Doors with transom",
      "Wine doors",
      "Windows",
    ] satisfies DoorType[],
  },
  {
    key: "glass",
    label: "Glass",
    type: "multi-select",
    field: "glass",
    options: ["Tempered", "Impact"] satisfies Glass[],
  },
  {
    key: "shapes",
    label: "Shape",
    type: "multi-select",
    field: "shapes",
    options: ["Flat", "Arch", "Round"] satisfies Shape[],
  },
  {
    key: "thermal",
    label: "Thermal Break",
    type: "multi-select",
    field: "thermal",
    options: ["Yes", "No"],
  },
  {
    key: "onSale",
    label: "On Sale",
    type: "multi-select",
    field: "onSale",
    options: ["Yes", "No"],
  },
  {
    key: "width",
    label: "Width (in)",
    type: "range",
    field: "widthIn",
    min: 30,
    max: 80,
    unit: "″",
  },
  {
    key: "height",
    label: "Height (in)",
    type: "range",
    field: "heightIn",
    min: 72,
    max: 120,
    unit: "″",
  },
];
