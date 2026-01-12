// src/app/locations/[[...segments]]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  DESIGN_STUDIOS,
  SERVICE_AREAS,
  LOCATION_SERVICES,
} from "@/config/locations";

/**
 * Next.js 16: params is a Promise
 */
type PageProps = {
  params: Promise<{ segments?: string[] }>;
};

function jsonLd(data: object) {
  return {
    "application/ld+json": JSON.stringify(data),
  };
}

/* Step 5E-B: BreadcrumbList helper */
function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }),
  };
}

/* Step 5E-C: FAQPage helper */
function faqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    }),
  };
}

function absUrl(path: string) {
  const base = "https://abbyirondoors.com";
  if (!path) return base;
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

/* Build all static paths */
export async function generateStaticParams() {
  const params: { segments: string[] }[] = [];

  for (const studio of DESIGN_STUDIOS) {
    params.push({ segments: [studio.slug] });
  }

  for (const studio of DESIGN_STUDIOS) {
    for (const svc of LOCATION_SERVICES) {
      params.push({ segments: [studio.citySlug, svc.slug] });
    }
  }

  return params;
}

/* =========================
   Metadata + JSON-LD
   Step 5E-A + 5E-B + 5E-C
========================= */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segments = [] } = await params;

  /* ---------- Case A: Studio ---------- */
  if (segments.length === 1) {
    const studio = DESIGN_STUDIOS.find((s) => s.slug === segments[0]);
    if (!studio) return {};

    const canonical = `https://abbyirondoors.com/locations/${studio.slug}`;
    const ogImage = absUrl(studio.heroImage ?? "/locations/default-hero.jpg");

    const localBusinessLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${canonical}#localbusiness`,
      name: `Abby Iron Doors – ${studio.city} Design Studio`,
      url: canonical,
      image: ogImage,
      brand: { "@type": "Brand", name: "Abby Iron Doors" },
      areaServed: { "@type": "City", name: studio.city },
    };

    const breadcrumbLd = breadcrumbJsonLd([
      { name: "Home", url: "https://abbyirondoors.com" },
      { name: "Locations", url: "https://abbyirondoors.com/locations" },
      { name: `${studio.city} Design Studio`, url: canonical },
    ]);

    const faqLd = faqJsonLd([
      {
        question: `Do you offer custom iron doors in ${studio.city}?`,
        answer: `Yes. Abby Iron Doors designs and installs fully custom iron doors and windows for homeowners in ${studio.city} and nearby areas.`,
      },
      {
        question: "How long does it take to design and install a custom iron door?",
        answer:
          "Timelines vary by design and scope, but most custom iron door projects are completed within several weeks from design approval to installation.",
      },
      {
        question: `Do you serve areas near ${studio.city}?`,
        answer:
          "Yes. Our design studio serves homeowners throughout the greater region surrounding the city.",
      },
      {
        question: "How can I schedule a consultation?",
        answer:
          "You can request a quote or schedule a consultation directly through our website to speak with our design team.",
      },
    ]);

    return {
      title: `${studio.city} Design Studio | Custom Iron Doors & Windows | Abby Iron Doors`,
      description: studio.introText,
      alternates: { canonical },
      openGraph: {
        title: `${studio.city} Design Studio | Abby Iron Doors`,
        description: studio.introText,
        url: canonical,
        siteName: "Abby Iron Doors",
        images: [{ url: ogImage, width: 1200, height: 630 }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${studio.city} Design Studio | Abby Iron Doors`,
        images: [ogImage],
      },
      other: {
        ...jsonLd(localBusinessLd),
        ...breadcrumbLd,
        ...faqLd,
      },
    };
  }

  /* ---------- Case B: City + Service ---------- */
  if (segments.length === 2) {
    const [citySlug, serviceSlug] = segments;
    const studio = DESIGN_STUDIOS.find((s) => s.citySlug === citySlug);
    const service = LOCATION_SERVICES.find((s) => s.slug === serviceSlug);
    if (!studio || !service) return {};

    const canonical = `https://abbyirondoors.com/locations/${citySlug}/${serviceSlug}`;
    const ogImage = absUrl(studio.heroImage ?? "/locations/default-hero.jpg");

    const serviceLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: `${service.name} in ${studio.city}`,
      provider: { "@type": "Organization", name: "Abby Iron Doors" },
      areaServed: { "@type": "City", name: studio.city },
      url: canonical,
    };

    const breadcrumbLd = breadcrumbJsonLd([
      { name: "Home", url: "https://abbyirondoors.com" },
      { name: "Locations", url: "https://abbyirondoors.com/locations" },
      { name: studio.city, url: `https://abbyirondoors.com/locations/${studio.slug}` },
      { name: service.name, url: canonical },
    ]);

    const faqLd = faqJsonLd([
      {
        question: `Do you provide ${service.name.toLowerCase()} in ${studio.city}?`,
        answer: `Yes. Abby Iron Doors provides ${service.name.toLowerCase()} services tailored for homes in ${studio.city}.`,
      },
      {
        question: "Are your iron doors custom made?",
        answer:
          "All of our iron doors and windows are custom designed to match each home’s architecture and security needs.",
      },
      {
        question: "How do I get a quote?",
        answer:
          "You can request a personalized quote online by submitting your project details through our website.",
      },
      {
        question: `What areas near ${studio.city} do you serve?`,
        answer:
          "Our team serves homeowners throughout the surrounding metropolitan and regional areas.",
      },
    ]);

    return {
      title: `${service.name} in ${studio.city} | Abby Iron Doors`,
      description: `Premium ${service.name.toLowerCase()} in ${studio.city}.`,
      alternates: { canonical },
      openGraph: {
        title: `${service.name} in ${studio.city}`,
        description: `Premium ${service.name.toLowerCase()} for ${studio.city} homes.`,
        url: canonical,
        siteName: "Abby Iron Doors",
        images: [{ url: ogImage, width: 1200, height: 630 }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.name} in ${studio.city}`,
        images: [ogImage],
      },
      other: {
        ...jsonLd(serviceLd),
        ...breadcrumbLd,
        ...faqLd,
      },
    };
  }

  /* ---------- /locations ---------- */
  if (segments.length === 0) {
    return {
      title: "Locations | Abby Iron Doors",
      description:
        "Explore Abby Iron Doors design studios and service areas for custom iron doors and windows.",
      alternates: { canonical: "https://abbyirondoors.com/locations" },
    };
  }

  return {};
}

export default async function LocationPage({ params }: PageProps) {
  const { segments = [] } = await params;

  // =========================
  // /locations 主页
  // =========================
  if (segments.length === 0) {
    // 你原来的 /locations 页面如果在别处实现，就在这里 return 你原组件；
    // 这里给一个最简单的兜底，避免 404
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Locations</h1>
        <p className="mt-4 text-gray-600">
          Explore our design studios and the areas we serve.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DESIGN_STUDIOS.map((s) => (
            <a
              key={s.slug}
              href={`/locations/${s.slug}`}
              className="rounded-xl border bg-white p-6 shadow-sm hover:shadow"
            >
              <div className="text-lg font-semibold">{s.name}</div>
              <div className="mt-2 text-sm text-gray-600">{s.city}</div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // =========================
  // Case A: /locations/{studio-slug}
  // =========================
  if (segments.length === 1) {
    const studioSlug = segments[0];
    const studio = DESIGN_STUDIOS.find((s) => s.slug === studioSlug);
    if (!studio) return notFound();

    const stateGroup = SERVICE_AREAS.find((g) => g.cities.includes(studio.city));
    const heroSrc = studio.heroImage ?? "/locations/default-hero.jpg";

    // ✅ Step 5C-B：Explore other studios（排除当前 studio）
    const otherStudios = DESIGN_STUDIOS.filter((s) => s.slug !== studio.slug);

    // ✅ Step 5C-B：自然语言锚点用到的 service 列表（你也可以只取你希望出现在页面上的那几个）
    const anchorServices = LOCATION_SERVICES;

    return (
      <div className="w-full">
        {/* Hero */}
        <section className="relative h-[420px] overflow-hidden bg-gray-300">
          <img
            src={heroSrc}
            alt={`${studio.name} - Abby Iron Doors`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="max-w-2xl text-white">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
                Abby Iron Doors
              </p>
              <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{studio.name}</h1>
              <p className="mt-4 text-base text-white/90">
                Custom iron doors and windows designed for {studio.city} homes — engineered for security,
                performance, and timeless aesthetics.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href="/get-quote"
                  className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-100"
                >
                  Get a Quote
                </a>
                <a
                  href="#schedule"
                  className="rounded-full border border-white/80 px-6 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Schedule a Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold">
            {studio.introTitle || `Custom Iron Doors in ${studio.city}`}
          </h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            {studio.introText ||
              `Abby Iron Doors proudly serves homeowners in ${studio.city} with custom iron doors and windows.`}
          </p>
        </section>

        {/* ✅ Step 5C-B-2：城市 + 服务 + 实体 自然语言锚点（补回） */}
        <section className="mx-auto max-w-6xl px-6 pb-6">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold">
              Popular Custom Iron Door & Window Services in {studio.city}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Explore Abby Iron Doors services in {studio.city}. These pages help you find the right
              ironwork solution—custom doors, security options, and luxury windows—tailored to your
              home’s architecture.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {anchorServices.map((svc) => (
                <a
                  key={svc.slug}
                  href={`/locations/${studio.citySlug}/${svc.slug}`}
                  className="rounded-xl border bg-gray-50 p-4 text-left hover:bg-gray-100"
                >
                  <div className="text-sm font-semibold text-gray-900">
                    {svc.name} in {studio.city}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    Premium {svc.name.toLowerCase()} by Abby Iron Doors.
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        {stateGroup && (
          <section className="bg-gray-100">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <h3 className="mb-8 text-center text-xl font-semibold">
                Serving the Greater {stateGroup.state} Area
              </h3>

              <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
                {stateGroup.cities.map((city) => (
                  <div
                    key={city}
                    className="rounded-md bg-white px-4 py-3 text-center shadow-sm"
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section id="schedule" className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h3 className="text-2xl font-semibold">Visit Our {studio.city} Design Studio</h3>
          <p className="mt-4 text-gray-600">
            Schedule a consultation with our {studio.city} team to explore custom door designs tailored to your home.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/get-quote"
              className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Request a Quote
            </a>
            <a
              href="/contact"
              className="rounded-full border border-black px-8 py-3 text-sm font-semibold hover:bg-black hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* ✅ Step 5C-B：Explore Other Abby Iron Doors Design Studios（补回，放在 CTA 之后，与你图2一致） */}
        {otherStudios.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-24 text-center">
            <h3 className="text-xl font-semibold">
              Explore Other Abby Iron Doors Design Studios
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
              Browse additional Abby Iron Doors design studios to explore custom iron doors and windows
              in other areas.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherStudios.map((s) => (
                <a
                  key={s.slug}
                  href={`/locations/${s.slug}`}
                  className="rounded-xl border bg-white p-6 shadow-sm hover:shadow"
                >
                  <div className="text-lg font-semibold">{s.city} Design Studio</div>
                  <div className="mt-2 text-sm text-gray-600">
                    Custom iron doors & windows in {s.city}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // =========================
  // Case B: /locations/{citySlug}/{serviceSlug}
  // =========================
  if (segments.length === 2) {
    const [citySlug, serviceSlug] = segments;

    const studio = DESIGN_STUDIOS.find((s) => s.citySlug === citySlug);
    const service = LOCATION_SERVICES.find((s) => s.slug === serviceSlug);

    if (!studio || !service) return notFound();

    const heroSrc = studio.heroImage ?? "/locations/default-hero.jpg";

    // ✅ 可选：在 service 页面也补一个“Explore other studios”（你要的话就保留；不要就删掉这个变量+section）
    const otherStudios = DESIGN_STUDIOS.filter((s) => s.slug !== studio.slug);

    return (
      <div className="w-full">
        <section className="relative h-[380px] overflow-hidden bg-gray-300">
          <img
            src={heroSrc}
            alt={`${service.name} in ${studio.city} - Abby Iron Doors`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="max-w-2xl text-white">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
                Abby Iron Doors
              </p>
              <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
                {service.name} in {studio.city}
              </h1>
              <p className="mt-4 text-base text-white/90">
                Premium {service.name.toLowerCase()} tailored for {studio.city} homes.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href="/get-quote"
                  className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-100"
                >
                  Get a Quote
                </a>
                <a
                  href={`/locations/${studio.slug}`}
                  className="rounded-full border border-white/80 px-6 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Visit {studio.city} Studio
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold">
            {service.name} – {studio.city}
          </h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            Looking for {service.name.toLowerCase()} in {studio.city}? Abby Iron Doors designs and crafts
            premium ironwork tailored for luxury homes.
          </p>
        </section>

        {/* ✅ 可选补强：service 页面底部也给一个 studio 互链（更利于 SEO 内链闭环） */}
        {otherStudios.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-24 text-center">
            <h3 className="text-xl font-semibold">
              Explore Other Abby Iron Doors Design Studios
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherStudios.map((s) => (
                <a
                  key={s.slug}
                  href={`/locations/${s.slug}`}
                  className="rounded-xl border bg-white p-6 shadow-sm hover:shadow"
                >
                  <div className="text-lg font-semibold">{s.city} Design Studio</div>
                  <div className="mt-2 text-sm text-gray-600">
                    Custom iron doors & windows in {s.city}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return notFound();
}
