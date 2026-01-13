// src/app/(site)/in-stock/page.tsx
"use client";

import { useEffect,useMemo, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import type { ReactNode } from "react";
import Image from "next/image";
import { DoorProductGrid } from "@/components/doors/grid/DoorProductGrid";
import { RangeSliderPro } from "@/components/doors/filters/ui/RangeSliderPro";

/* =========================================================
 * 类型定义
 * ========================================================= */
type Availability = "Now" | "6-8 weeks";
type Style = "Modern" | "Transitional" | "Traditional";
type DoorType =
  | "Double door"
  | "Single door"
  | "Doors with Sidelight"
  | "Doors with transom"
  | "Wine doors"
  | "Windows";
type Glass = "Tempered" | "Impact";
type Shape = "Flat" | "Arch" | "Round";

type DoorProduct = {
  id: string;
  name: string;
  image: string;
  availability: Availability;
  style: Style;
  doorType: DoorType;
  widthIn: number;
  heightIn: number;
  glass: Glass;
  shape: Shape;
  thermal: boolean;
  onSale: boolean;
};

/* =========================================================
 * Demo 数据
 * ========================================================= */
const PRODUCTS: DoorProduct[] = [
  {
    id: "d1001",
    name: "D1001 – Single Door Jolee",
    image: "/images/in-stock/d1001.jpg",
    availability: "Now",
    style: "Modern",
    doorType: "Single door",
    widthIn: 40,
    heightIn: 82,
    glass: "Tempered",
    shape: "Flat",
    thermal: true,
    onSale: false,
  },
  {
    id: "d1002",
    name: "D1002 – Single Door (Sample)",
    image: "/images/in-stock/d1002.jpg",
    availability: "Now",
    style: "Transitional",
    doorType: "Single door",
    widthIn: 36,
    heightIn: 80,
    glass: "Tempered",
    shape: "Flat",
    thermal: true,
    onSale: true,
  },
  {
    id: "d1003",
    name: "D1003 – Single Door (Sample)",
    image: "/images/in-stock/d1003.jpg",
    availability: "6-8 weeks",
    style: "Traditional",
    doorType: "Single door",
    widthIn: 42,
    heightIn: 96,
    glass: "Impact",
    shape: "Arch",
    thermal: true,
    onSale: false,
  },
  {
    id: "d1006",
    name: "D1006 – Single Door (Installed Look)",
    image: "/images/in-stock/d1006.jpg",
    availability: "Now",
    style: "Modern",
    doorType: "Single door",
    widthIn: 38,
    heightIn: 84,
    glass: "Impact",
    shape: "Flat",
    thermal: false,
    onSale: false,
  },

  {
    id: "d2001",
    name: "D2001 – Double Door Jolee",
    image: "/images/in-stock/d2001.jpg",
    availability: "6-8 weeks",
    style: "Transitional",
    doorType: "Double door",
    widthIn: 72,
    heightIn: 96,
    glass: "Impact",
    shape: "Arch",
    thermal: true,
    onSale: true,
  },
  {
    id: "d2002",
    name: "D2002 – Double Door (Sample)",
    image: "/images/in-stock/d2002.jpg",
    availability: "Now",
    style: "Modern",
    doorType: "Double door",
    widthIn: 68,
    heightIn: 84,
    glass: "Tempered",
    shape: "Flat",
    thermal: true,
    onSale: false,
  },
  {
    id: "d2003",
    name: "D2003 – Double Door (Sample)",
    image: "/images/in-stock/d2003.jpg",
    availability: "Now",
    style: "Traditional",
    doorType: "Double door",
    widthIn: 74,
    heightIn: 96,
    glass: "Tempered",
    shape: "Arch",
    thermal: false,
    onSale: true,
  },
  {
    id: "d2004",
    name: "D2004 – Double Door (Outdoor Scene)",
    image: "/images/in-stock/d2004.jpg", // ⚠️注意：文件名大小写要一致
    availability: "6-8 weeks",
    style: "Transitional",
    doorType: "Double door",
    widthIn: 70,
    heightIn: 82,
    glass: "Impact",
    shape: "Flat",
    thermal: true,
    onSale: false,
  },

  {
    id: "w3001",
    name: "W3001 – Wine Cellar Door",
    image: "/images/in-stock/w3001.jpg",
    availability: "Now",
    style: "Traditional",
    doorType: "Wine doors",
    widthIn: 36,
    heightIn: 84,
    glass: "Tempered",
    shape: "Arch",
    thermal: false,
    onSale: false,
  },
  {
    id: "w3002",
    name: "W3002 – Wine Door (Sample)",
    image: "/images/in-stock/w3002.jpg",
    availability: "Now",
    style: "Modern",
    doorType: "Wine doors",
    widthIn: 34,
    heightIn: 80,
    glass: "Impact",
    shape: "Round",
    thermal: false,
    onSale: true,
  },
  {
    id: "w3003",
    name: "W3003 – Wine Door (Sample)",
    image: "/images/in-stock/w3003.jpg",
    availability: "6-8 weeks",
    style: "Transitional",
    doorType: "Wine doors",
    widthIn: 38,
    heightIn: 84,
    glass: "Tempered",
    shape: "Arch",
    thermal: true,
    onSale: false,
  },
];

/* =========================================================
 * Filter 结构
 * ========================================================= */
type Filters = {
  availability: Availability[];
  styles: Style[];
  doorTypes: DoorType[];
  glass: Glass[];
  shapes: Shape[];
  thermal: ("Yes" | "No")[];
  onSale: ("Yes" | "No")[];
  widthRange: [number, number];
  heightRange: [number, number];
};

type FacetArrayKeys = Exclude<
  keyof Filters,
  "widthRange" | "heightRange"
>;


type FacetValueMap = {
  availability: Availability;
  styles: Style;
  doorTypes: DoorType;
  glass: Glass;
  shapes: Shape;
  thermal: "Yes" | "No";
  onSale: "Yes" | "No";
};

type FacetKey = keyof FacetValueMap;

// 为了做  chip / pill system
type ActiveChip = {
  key: FacetKey | "widthRange" | "heightRange";
  label: string;
  value: string;
};

/* =========================================================
 * Marvin-style Chevron Arrow (Up / Down)
 * ========================================================= */
const SmallArrow = ({ isOpen }: { isOpen: boolean }) => (
  <span
    className={`
      inline-block
      transition-transform
      duration-200
      ease-out
    `}
    style={{
      width: 8,
      height: 8,
      borderRight: "2px solid #111",
      borderBottom: "2px solid #111",
      transform: isOpen
        ? "rotate(-135deg)" // 展开：向上 ^
        : "rotate(45deg)",  // 收起：向下 v
      marginLeft: 6,
    }}
  />
);

/* =========================================================
 * 定义一个「Apple 风」的 Reset Icon（纯 SVG）
 * ========================================================= */
const ResetIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <polyline points="3 4 3 10 9 10" />
  </svg>
);

/* =========================================================
 * Accordion Section
 * ========================================================= */
const AccordionSection = ({
  title,
  isOpen,
  toggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;
}) => (
  <div className="border-b border-gray-200 pb-3 mb-3 select-none">
    <div
      onClick={toggle}
      className="flex items-center justify-between cursor-pointer"
    >
      <h3 className="text-[13px] font-semibold tracking-wider text-gray-700">
        {title}
      </h3>
      <SmallArrow isOpen={isOpen} />
    </div>

    <div
      className={`transition-all overflow-hidden ${
        isOpen ? "max-h-[500px] mt-3" : "max-h-0"
      }`}
    >
      {children}
    </div>
  </div>
);



/* =========================================================
 * 主页面
 * ========================================================= */

// @20251217 为实现Marvin 同款的“成熟 Faceted Search 系统 --此处 新增【统一过滤函数】= count 逻辑
function applyFilters(
  products: DoorProduct[],
  filters: Filters
): DoorProduct[] {
  return products.filter((p) => {
    if (
      filters.availability.length &&
      !filters.availability.includes(p.availability)
    )
      return false;

    if (filters.styles.length && !filters.styles.includes(p.style))
      return false;

    if (
      filters.doorTypes.length &&
      !filters.doorTypes.includes(p.doorType)
    )
      return false;

    if (
      p.widthIn < filters.widthRange[0] ||
      p.widthIn > filters.widthRange[1]
    )
      return false;

    if (
      p.heightIn < filters.heightRange[0] ||
      p.heightIn > filters.heightRange[1]
    )
      return false;

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

// 新增【Marvin 核心函数：getFacetCount】
function getFacetCount<K extends FacetKey>(
  key: K,
  value: FacetValueMap[K],
  filters: Filters
) {
  const currentValues = filters[key] as FacetValueMap[K][];

  const nextFilters: Filters = {
    ...filters,
    [key]: currentValues.includes(value)
      ? currentValues
      : [...currentValues, value],
  };

  return applyFilters(PRODUCTS, nextFilters).length;
}

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

export default function InStockPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const [openSection, setOpenSection] = useState({
    availability: true,
    style: true,
    doorType: true,
    width: true,
    height: true,
    glass: true,
    shape: true,
    thermal: true,
    sale: true,
  });

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleSection = (key: keyof typeof openSection) =>
    setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));

  const hasActiveFilters =
  filters.availability.length > 0 ||
  filters.styles.length > 0 ||
  filters.doorTypes.length > 0 ||
  filters.glass.length > 0 ||
  filters.shapes.length > 0 ||
  filters.thermal.length > 0 ||
  filters.onSale.length > 0 ||
  filters.widthRange[0] !== DEFAULT_FILTERS.widthRange[0] ||
  filters.widthRange[1] !== DEFAULT_FILTERS.widthRange[1] ||
  filters.heightRange[0] !== DEFAULT_FILTERS.heightRange[0] ||
  filters.heightRange[1] !== DEFAULT_FILTERS.heightRange[1];

  const appliedFilterCount =
  (filters.availability.length > 0 ? 1 : 0) +
  (filters.styles.length > 0 ? 1 : 0) +
  (filters.doorTypes.length > 0 ? 1 : 0) +
  (filters.glass.length > 0 ? 1 : 0) +
  (filters.shapes.length > 0 ? 1 : 0) +
  (filters.thermal.length > 0 ? 1 : 0) +
  (filters.onSale.length > 0 ? 1 : 0) +
  (filters.widthRange[0] !== DEFAULT_FILTERS.widthRange[0] ||
  filters.widthRange[1] !== DEFAULT_FILTERS.widthRange[1]
    ? 1
    : 0) +
  (filters.heightRange[0] !== DEFAULT_FILTERS.heightRange[0] ||
  filters.heightRange[1] !== DEFAULT_FILTERS.heightRange[1]
    ? 1
    : 0);

  const activeChips = useMemo<ActiveChip[]>(() => {
    const chips: ActiveChip[] = [];

    filters.availability.forEach((v) =>
      chips.push({ key: "availability", label: "Availability", value: v })
    );

    filters.styles.forEach((v) =>
      chips.push({ key: "styles", label: "Style", value: v })
    );

    filters.doorTypes.forEach((v) =>
      chips.push({ key: "doorTypes", label: "Door Type", value: v })
    );

    filters.glass.forEach((v) =>
      chips.push({ key: "glass", label: "Glass", value: v })
    );

    filters.shapes.forEach((v) =>
      chips.push({ key: "shapes", label: "Shape", value: v })
    );

    filters.thermal.forEach((v) =>
      chips.push({ key: "thermal", label: "Thermal", value: v })
    );

    filters.onSale.forEach((v) =>
      chips.push({ key: "onSale", label: "On Sale", value: v })
    );

    // Width Range
    if (
      filters.widthRange[0] !== DEFAULT_FILTERS.widthRange[0] ||
      filters.widthRange[1] !== DEFAULT_FILTERS.widthRange[1]
    ) {
      chips.push({
        key: "widthRange",
        label: "Width",
        value: `${filters.widthRange[0]}″–${filters.widthRange[1]}″`,
      });
    }

    // Height Range
    if (
      filters.heightRange[0] !== DEFAULT_FILTERS.heightRange[0] ||
      filters.heightRange[1] !== DEFAULT_FILTERS.heightRange[1]
    ) {
      chips.push({
        key: "heightRange",
        label: "Height",
        value: `${filters.heightRange[0]}″–${filters.heightRange[1]}″`,
      });
    }

    return chips;
  }, [filters]);
  
  const removeChip = (chip: ActiveChip) => {
    setFilters((prev) => {
      if (chip.key === "widthRange") {
        return { ...prev, widthRange: DEFAULT_FILTERS.widthRange };
      }

      if (chip.key === "heightRange") {
        return { ...prev, heightRange: DEFAULT_FILTERS.heightRange };
      }

      return {
        ...prev,
        [chip.key]: (prev[chip.key] as string[]).filter(
          (v) => v !== chip.value
        ),
      } as Filters;
    });
  };

  const filteredProducts = useMemo(() => {
    return applyFilters(PRODUCTS, filters);
  }, [filters]);

  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Header 区域 */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] md:text-[36px] leading-tight font-semibold tracking-wide">
            In-Stock Gallery
          </h1>
          <div className="mt-3 h-px w-24 bg-gray-300 mx-auto" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-[13px] leading-relaxed">
            Browse our ready-to-ship iron doors and windows. All pieces are
            pre-built and ready to leave our Atlanta warehouse. Use the filters
            on the left to narrow by style, size, and glass type.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8" />

        {/* ---------------- 主体区域：左 Filter + 右卡片 ---------------- */}
        <div className="mt-6 flex gap-10">
          {/* ---------------- 左侧 Filter Sidebar ---------------- */}
          <aside className="w-72 shrink-0">
            <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
              {/* 1. Availability */}
              <AccordionSection
                title="Availability"
                isOpen={openSection.availability}
                toggle={() => toggleSection("availability")}
              >
                {(["Now", "6-8 weeks"] as Availability[]).map((value) => {
                  const count = getFacetCount("availability", value, filters);

                  return (
                    <label key={value} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-400"
                        checked={filters.availability.includes(value)}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            availability: prev.availability.includes(value)
                              ? prev.availability.filter((v) => v !== value)
                              : [...prev.availability, value],
                          }))
                        }
                      />

                      <span className="flex-1 text-sm">{value}</span>

                      <span className="text-xs text-gray-400">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </AccordionSection>

              {/* 2. Style */}
              <AccordionSection
                title="Style"
                isOpen={openSection.style}
                toggle={() => toggleSection("style")}
              >
                {(["Modern", "Transitional", "Traditional"] as Style[]).map((value) => {
                  const count = getFacetCount("styles", value, filters);

                  return (
                    <label key={value} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-400"
                        checked={filters.styles.includes(value)}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            styles: prev.styles.includes(value)
                              ? prev.styles.filter((v) => v !== value)
                              : [...prev.styles, value],
                          }))
                        }
                      />

                      <span className="flex-1 text-sm">{value}</span>

                      <span className="text-xs text-gray-400">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </AccordionSection>

              {/* 3. Door Type */}
              <AccordionSection
                title="Door Type"
                isOpen={openSection.doorType}
                toggle={() => toggleSection("doorType")}
              >
                {(
                  [
                    "Double door",
                    "Single door",
                    "Doors with Sidelight",
                    "Doors with transom",
                    "Wine doors",
                    "Windows",
                  ] as DoorType[]
                ).map((value) => {
                  const count = getFacetCount("doorTypes", value, filters);

                  return (
                    <label key={value} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-400"
                        checked={filters.doorTypes.includes(value)}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            doorTypes: prev.doorTypes.includes(value)
                              ? prev.doorTypes.filter((v) => v !== value)
                              : [...prev.doorTypes, value],
                          }))
                        }
                      />

                      <span className="flex-1 text-sm">{value}</span>

                      <span className="text-xs text-gray-400">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </AccordionSection>

              {/* 4. Width (in) */}
              <AccordionSection
                title="Width (in)"
                isOpen={openSection.width}
                toggle={() => toggleSection("width")}
              >
                <RangeSliderPro
                  min={24}
                  max={96}
                  value={filters.widthRange}
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, widthRange: value }))
                  }
                />
              </AccordionSection>

              {/* 5. Height (in) */}
              <AccordionSection
                title="Height (in)"
                isOpen={openSection.height}
                toggle={() => toggleSection("height")}
              >
                <RangeSliderPro
                  min={72}
                  max={120}
                  value={filters.heightRange}
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, heightRange: value }))
                  }
                />
              </AccordionSection>

              {/* 6. Glass */}
              <AccordionSection
                title="Glass"
                isOpen={openSection.glass}
                toggle={() => toggleSection("glass")}
              >
                {(["Tempered", "Impact"] as Glass[]).map((value) => {
                  const count = getFacetCount("glass", value, filters);

                  return (
                    <label key={value} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={filters.glass.includes(value)}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            glass: prev.glass.includes(value)
                              ? prev.glass.filter((v) => v !== value)
                              : [...prev.glass, value],
                          }))
                        }
                      />
                      <span className="flex-1 text-sm">{value}</span>
                      <span className="text-xs text-gray-400">({count})</span>
                    </label>
                  );
                })}
              </AccordionSection>

              {/* 7. Shape */}
              <AccordionSection
                title="Shape"
                isOpen={openSection.shape}
                toggle={() => toggleSection("shape")}
              >
                {(["Flat", "Arch", "Round"] as Shape[]).map((value) => {
                  const count = getFacetCount("shapes", value, filters);

                  return (
                    <label key={value} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={filters.shapes.includes(value)}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            shapes: prev.shapes.includes(value)
                              ? prev.shapes.filter((v) => v !== value)
                              : [...prev.shapes, value],
                          }))
                        }
                      />
                      <span className="flex-1 text-sm">{value}</span>
                      <span className="text-xs text-gray-400">({count})</span>
                    </label>
                  );
                })}
              </AccordionSection>

              {/* 8. Thermal */}
              <AccordionSection
                title="Thermal"
                isOpen={openSection.thermal}
                toggle={() => toggleSection("thermal")}
              >
                {(["Yes", "No"] as const).map((value) => {
                  const count = getFacetCount("thermal", value, filters);

                  return (
                    <label key={value} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={filters.thermal.includes(value)}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            thermal: prev.thermal.includes(value)
                              ? prev.thermal.filter((v) => v !== value)
                              : [...prev.thermal, value],
                          }))
                        }
                      />
                      <span className="flex-1 text-sm">{value}</span>
                      <span className="text-xs text-gray-400">({count})</span>
                    </label>
                  );
                })}
              </AccordionSection>

              {/* 9. On Sale */}
              <AccordionSection
                title="On Sale (Big Deal)"
                isOpen={openSection.sale}
                toggle={() => toggleSection("sale")}
              >
                {(["Yes", "No"] as const).map((value) => {
                  const count = getFacetCount("onSale", value, filters);

                  return (
                    <label key={value} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={filters.onSale.includes(value)}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            onSale: prev.onSale.includes(value)
                              ? prev.onSale.filter((v) => v !== value)
                              : [...prev.onSale, value],
                          }))
                        }
                      />
                      <span className="flex-1 text-sm">{value}</span>
                      <span className="text-xs text-gray-400">({count})</span>
                    </label>
                  );
                })}
              </AccordionSection>

              {hasActiveFilters && (
                <div className="mt-4 pt-1 space-y-1">
                  <div className="text-[12px] text-gray-400">
                    {appliedFilterCount} filter{appliedFilterCount > 1 ? "s" : ""} applied
                  </div>

                  <button
                    onClick={resetFilters}
                    className="
                      group
                      inline-flex items-center gap-2
                      text-[13px] text-gray-500
                      hover:text-black
                      transition-colors
                    "
                  >
                    <span
                      className="
                        transition-transform
                        group-hover:rotate-[-20deg]
                      "
                    >
                      <ResetIcon />
                    </span>

                    <span className="underline underline-offset-2">
                      Clear all filters ({appliedFilterCount})
                    </span>
                  </button>
                </div>
              )} 

            </div>
          </aside>

          {/* ---------------- 右侧产品展示区域 ---------------- */}
          <section className="flex-1">
            {/* 顶部计数 */}
            <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
              <span>
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                {PRODUCTS.length} in-stock items
                {activeChips.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {activeChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="
                          inline-flex items-center gap-1
                          rounded-full
                          border border-[#f6a800]
                          bg-[#fff4d6]
                          px-3 py-1
                          text-xs text-gray-800
                        "
                      >
                        <span className="font-medium">{chip.label}:</span>
                        <span>{chip.value}</span>

                        <button
                          onClick={() => removeChip(chip)}
                          className="
                            ml-1
                            text-gray-500
                            hover:text-black
                            transition-colors
                          "
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    <button
                      onClick={resetFilters}
                      className="ml-2 text-xs text-gray-500 underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </span>
            </div>

            {/* ---------------- 分页逻辑 ---------------- */}
            <Pagination
              key={filteredProducts.length}   // ⭐ 核心
              items={filteredProducts}
              itemsPerPage={9}
            > 
              {(pageItems) => (
                <>
                  <DoorProductGrid
                    products={pageItems}
                    headerLeft={
                      <div className="text-xs text-gray-500">
                        Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length}{" "}
                        in-stock items
                      </div>
                    }
                  />
                </>
              )}
            </Pagination>
          </section>
        </div>
      </section>
    </main>
  );
}

// ===============================
// Pagination 分页组件（泛型 T）
// ===============================
function Pagination<T>({
  items,
  itemsPerPage,
  children,
}: {
  items: T[];
  itemsPerPage: number;
  children: (pageItems: T[]) => ReactNode;
}) {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const pageItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const goPage = (p: number) => {
    if (p >= 1 && p <= pageCount) setPage(p);
  };

  return (
    <div className="mt-8">
      {children(pageItems)}

      {pageCount > 1 && (
        <div className="flex justify-center mt-8 gap-2 text-sm">
          <button
            onClick={() => goPage(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 border rounded ${
              page === 1 ? "text-gray-400 border-gray-300" : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goPage(p)}
              className={`px-3 py-1 border rounded ${
                page === p
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goPage(page + 1)}
            disabled={page === pageCount}
            className={`px-3 py-1 border rounded ${
              page === pageCount
                ? "text-gray-400 border-gray-300"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
