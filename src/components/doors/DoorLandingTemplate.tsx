// src/components/doors/DoorLandingTemplate.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Crumb = { label: string; href: string };

export type DoorLandingTemplateProps = {
  // SEO / 内容
  title: string;                 // H1
  intro: string;                 // why 段落
  bannerImage?: string;          // 顶部大图（public 路径）
  breadcrumbs: Crumb[];

  // what 区块
  whatTitle: string;             // H2 "What are ...?"
  whatBody: string;              // 解释段落
  whatImage?: string;            // what 区块右侧大图（public 路径）

  // 左侧 Filters
  FiltersSlot?: React.ReactNode;

  // ⭐ 新增：右侧 Results Slot（核心）
  ResultsSlot?: React.ReactNode;

  // 兼容旧页面
  resultsCountText?: string;
};

function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-neutral-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2">
        {items.map((c, idx) => (
          <li key={c.href} className="flex items-center gap-2">
            <Link href={c.href} className="hover:text-neutral-800">
              {c.label}
            </Link>
            {idx < items.length - 1 ? <span>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function PlaceholderProductCard() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-neutral-100" />
      <div className="p-3">
        <div className="h-4 w-2/3 bg-neutral-100 rounded" />
        <div className="mt-2 h-3 w-1/2 bg-neutral-100 rounded" />
      </div>
    </div>
  );
}

function FiveImageMosaic({
  images,
}: {
  images: { src?: string; alt: string }[];
}) {
  const safe = [...images];
  while (safe.length < 5) safe.push({ alt: "placeholder" });

  return (
    <section className="mx-auto max-w-6xl px-6 pb-14">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-7">
          <div className="relative h-72 md:h-[420px] overflow-hidden rounded-2xl bg-neutral-100">
            {safe[0].src && (
              <Image
                src={safe[0].src}
                alt={safe[0].alt}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-3">
          {safe.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="relative h-32 md:h-[203px] overflow-hidden rounded-2xl bg-neutral-100"
            >
              {img.src && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DoorLandingTemplate(props: DoorLandingTemplateProps) {
  const {
    title,
    intro,
    bannerImage,
    breadcrumbs,
    whatTitle,
    whatBody,
    whatImage,
    FiltersSlot,
    ResultsSlot,
    resultsCountText = "Showing results",
  } = props;

  return (
    <main className="bg-white">
      {/* 1) Banner */}
      <section className="w-full">
        <div className="relative h-[220px] sm:h-[280px] md:h-[340px] bg-neutral-200">
          {bannerImage ? (
            <Image
              src={bannerImage}
              alt={`${title} banner`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-100" />
          )}
        </div>
      </section>

      {/* 2–3) Breadcrumb + H1 */}
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-600 leading-relaxed">
          {intro}
        </p>
      </section>

      {/* 4–5) Filters + Results */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-14">
        <div className="grid grid-cols-12 gap-8">
          {/* left */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold">Filters</div>
              <div className="mt-3">
                {FiltersSlot ?? (
                  <div className="space-y-3">
                    <div className="h-4 w-24 bg-neutral-100 rounded" />
                    <div className="h-4 w-32 bg-neutral-100 rounded" />
                    <div className="h-4 w-28 bg-neutral-100 rounded" />
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* right */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {resultsCountText}
              </div>
              <Link
                href="/get-quote"
                className="rounded-full border px-4 py-2 text-sm"
              >
                Get Quote
              </Link>
            </div>

            <div className="mt-5">
              {ResultsSlot ? (
                ResultsSlot
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <PlaceholderProductCard key={i} />
                  ))}
                </div>
              )}
            </div>

            {/* dealer */}
            <div className="mt-8 rounded-2xl border p-5 text-sm">
              <div className="font-semibold">Looking for a local dealer?</div>
              <p className="mt-1 text-neutral-600">
                Visit our location pages to see local projects and service areas.
              </p>
              <div className="mt-3 flex gap-2">
                <Link href="/locations" className="rounded-full border px-4 py-2">
                  View Locations
                </Link>
                <Link
                  href="/locations/atlanta"
                  className="rounded-full border px-4 py-2"
                >
                  Atlanta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) What */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-3xl font-semibold">{whatTitle}</h2>
            <p className="mt-3 text-neutral-600">{whatBody}</p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="relative h-64 md:h-[360px] rounded-2xl overflow-hidden bg-neutral-100">
              {whatImage && (
                <Image src={whatImage} alt={whatTitle} fill />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7–9) Inspired + Mosaic + Dealer CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-8 text-center">
        <h2 className="text-3xl font-semibold">Get Inspired</h2>
        <p className="mt-2 text-neutral-600">
          See how doors can transform a home.
        </p>
        <Link
          href="/inspiration"
          className="inline-flex mt-4 rounded-full bg-[#f5c400] px-5 py-2 font-semibold"
        >
          Visit the Gallery
        </Link>
      </section>

      <FiveImageMosaic
        images={[
          { src: "/images/placeholder/door-1.jpg", alt: "1" },
          { src: "/images/placeholder/door-2.jpg", alt: "2" },
          { src: "/images/placeholder/door-3.jpg", alt: "3" },
          { src: "/images/placeholder/door-4.jpg", alt: "4" },
          { src: "/images/placeholder/door-5.jpg", alt: "5" },
        ]}
      />

      <section className="w-full bg-neutral-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <h2 className="text-3xl font-semibold">Find a Dealer</h2>
          <p className="mt-2 text-white/80 max-w-3xl mx-auto">
            Our experts help bring your vision to life.
          </p>
          <Link
            href="/locations"
            className="inline-flex mt-5 rounded-full bg-[#f5c400] px-5 py-2 font-semibold text-black"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
