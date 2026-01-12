// src/app/(site)/doors/by-type/bi-fold/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  collection: "Elevate" | "Ultimate" | "Vivid";
  exteriorFinish: "Black" | "Bronze" | "Steel";
  interiorFinish: "Wood" | "White" | "Black";
  image: string;
};

// ==== 临时本地数据（以后会改 Django API） ====
const PRODUCTS: Product[] = [
  {
    id: "vivid-bi-fold",
    name: "Vivid Bi-Fold Door",
    collection: "Vivid",
    exteriorFinish: "Black",
    interiorFinish: "White",
    image: "/bi-fold-1.jpg",
  },
  {
    id: "ultimate-bi-fold",
    name: "Ultimate Bi-Fold Door",
    collection: "Ultimate",
    exteriorFinish: "Bronze",
    interiorFinish: "Wood",
    image: "/bi-fold-2.jpg",
  },
  {
    id: "elevate-bi-fold",
    name: "Elevate Bi-Fold Door",
    collection: "Elevate",
    exteriorFinish: "Black",
    interiorFinish: "Wood",
    image: "/bi-fold-3.jpg",
  },
];

// ==== 新增：统计每个字段数量的函数 ====
function countByField(items: Product[], field: keyof Product) {
  const map: Record<string, number> = {};
  items.forEach((item) => {
    const key = String(item[field]);
    map[key] = (map[key] || 0) + 1;
  });
  return map;
}

export default function BiFoldDoorListingPage() {
  // Filters state
  const [collectionFilter, setCollectionFilter] = useState<string | null>(null);
  const [exteriorFilter, setExteriorFilter] = useState<string | null>(null);

  // 统计数量
  const collectionCounts = countByField(PRODUCTS, "collection");
  const exteriorCounts = countByField(PRODUCTS, "exteriorFinish");

  // ==== Filtered 产品 ====
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (collectionFilter && p.collection !== collectionFilter) return false;
      if (exteriorFilter && p.exteriorFinish !== exteriorFilter) return false;
      return true;
    });
  }, [collectionFilter, exteriorFilter]);

  return (
    <div className="flex flex-col">
      {/* ---------------- Hero Banner ---------------- */}
      <div className="relative h-[420px] w-full">
        <img
          src="/hero_bifold-door_2400_801.webp"
          alt="Bi-Fold Doors Hero"
          className="h-full w-full object-cover"
        />
      </div>

      {/* ---------------- Content Container ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* -------- Breadcrumb -------- */}
        <nav className="mb-4 text-sm text-gray-500 space-x-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>›</span>

          <Link href="/doors" className="hover:underline">Products</Link>
          <span>›</span>

          <Link href="/doors/by-type" className="hover:underline">Doors</Link>
          <span>›</span>

          <span className="font-medium text-gray-900">Bi-Fold</span>
        </nav>

        {/* -------- Title & Description -------- */}
        <h1 className="mb-3 text-4xl font-bold">Bi-Fold Doors</h1>

        <p className="mb-10 max-w-3xl text-gray-600 leading-7">
          Take advantage of stunning views and sweeping vistas. Abby bi-fold doors
          combine narrow sightlines with strong steel construction for modern luxury homes.
        </p>

        {/* ---------------- Main Layout Grid ---------------- */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px,1fr] pb-20">
          {/* -------- Left Filters -------- */}
          <aside className="space-y-8 border-r pr-6">

            {/* ===== Collection Filter ===== */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                Collection
              </h4>
              <div className="space-y-1 text-sm">
                {["Elevate", "Ultimate", "Vivid"].map((name) => (
                  <label key={name} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="collection"
                      checked={collectionFilter === name}
                      onChange={() =>
                        setCollectionFilter(collectionFilter === name ? null : name)
                      }
                    />
                    <span>
                      {name}{" "}
                      <span className="text-gray-400">
                        ({collectionCounts[name] ?? 0})
                      </span>
                    </span>
                  </label>
                ))}

                <button
                  className="mt-1 text-xs text-gray-500 underline"
                  onClick={() => setCollectionFilter(null)}
                >
                  Clear collection
                </button>
              </div>
            </div>

            {/* ===== Exterior Finish Filter ===== */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                Exterior Finish
              </h4>
              <div className="space-y-1 text-sm">
                {["Black", "Bronze", "Steel"].map((name) => (
                  <label key={name} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="exterior"
                      checked={exteriorFilter === name}
                      onChange={() =>
                        setExteriorFilter(exteriorFilter === name ? null : name)
                      }
                    />
                    <span>
                      {name}{" "}
                      <span className="text-gray-400">
                        ({exteriorCounts[name] ?? 0})
                      </span>
                    </span>
                  </label>
                ))}

                <button
                  className="mt-1 text-xs text-gray-500 underline"
                  onClick={() => setExteriorFilter(null)}
                >
                  Clear finish
                </button>
              </div>
            </div>

          </aside>

          {/* -------- Right Product Grid -------- */}
          <div>
            <div className="mb-4 text-sm text-gray-500">
              Showing <span className="font-semibold">{filtered.length}</span> of{" "}
              {PRODUCTS.length} results
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-lg"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-56 w-full object-cover bg-gray-200"
                  />
                  <div className="p-4 space-y-1 text-sm">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-gray-500">{p.collection} Collection</div>
                    <div className="text-xs text-gray-500">
                      Exterior: {p.exteriorFinish} · Interior: {p.interiorFinish}
                    </div>

                    <button className="mt-2 w-full rounded-full border border-gray-300 py-1 text-xs font-medium hover:border-black">
                      View details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
