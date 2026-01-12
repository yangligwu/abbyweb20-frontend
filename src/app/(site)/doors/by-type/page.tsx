// src/app/(site)/doors/by-type/page.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DOOR_TYPES = [
  { slug: "bi-fold", label: "Bi-Fold" },
  { slug: "sliding", label: "Sliding" },
  { slug: "entry", label: "Entry" },
  { slug: "lift-and-slide", label: "Lift and Slide" },
  { slug: "multi-slide", label: "Multi-Slide" },
  { slug: "swinging", label: "Swinging" },
  { slug: "commercial", label: "Commercial" },
  { slug: "interior", label: "Interior" },
];

export default function BrowseByTypePage() {
  const pathname = usePathname();

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Browse doors by type
      </h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {DOOR_TYPES.map(({ slug, label }) => {
          const href = `/doors/by-type/${slug}`;

          const isActive = pathname === href;

          return (
            <Link
              key={slug}
              href={href}
              className={`
                block rounded-lg border px-6 py-4 text-center text-sm transition
                ${
                  isActive
                    ? "bg-white shadow-sm border-gray-400 font-semibold"
                    : "bg-gray-50 border-gray-300 hover:bg-white hover:shadow"
                }
              `}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
