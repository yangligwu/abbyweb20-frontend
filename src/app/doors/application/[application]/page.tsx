// src/app/doors/application/[application]/page.tsx
import type { Metadata } from "next";
import DoorLandingTemplate from "@/components/doors/DoorLandingTemplate";
import { DoorInStockFilters } from "@/components/doors/filters/DoorInStockFilters";
import { DoorProductGrid } from "@/components/doors/grid/DoorProductGrid";
import type { DoorProductCardData } from "@/components/doors/grid/DoorProductCard";

/* =========================================================
 * Types
 * ========================================================= */
type RouteParams = { application?: string };

type PageProps = {
  params: Promise<RouteParams>;
};

type AppConfig = {
  title: string;
  intro: string;
  whatTitle: string;
  whatBody: string;
  bannerImage?: string;
  whatImage?: string;
};

/* =========================================================
 * Config
 * ========================================================= */
const APPLICATION_CONFIG: Record<string, AppConfig> = {
  residential: {
    title: "Residential Doors",
    intro:
      "Residential doors are designed to elevate curb appeal, improve security, and create a welcoming first impression.\n\nExplore door solutions commonly used for luxury homes, entryways, patios, and indoor-outdoor transitions.",
    whatTitle: "What are residential doors used for?",
    whatBody:
      "Residential doors are installed in homes and private living spaces, with a focus on aesthetics, insulation, security, and daily usability. Common use cases include front entry doors, patio doors, side entrances, and wine rooms.",
    bannerImage: "/images/placeholder/banner-swinging.jpg",
    whatImage: "/images/placeholder/what-swinging.jpg",
  },
  commercial: {
    title: "Commercial Doors",
    intro:
      "Commercial doors are engineered for durability, higher traffic, and long-term performance in business environments.\n\nExplore solutions for storefronts, offices, hospitality, and mixed-use buildings.",
    whatTitle: "What are commercial doors used for?",
    whatBody:
      "Commercial doors are installed in business and public environments, emphasizing strength, code compliance, traffic durability, and professional appearance. Common use cases include office entries, retail storefronts, restaurants, and multi-tenant buildings.",
    bannerImage: "/images/placeholder/banner-pivot.jpg",
    whatImage: "/images/placeholder/what-pivot.jpg",
  },
};

/* =========================================================
 * Helpers
 * ========================================================= */
function resolveApplicationKey(input: unknown, fallback = "residential") {
  if (typeof input === "string" && input.trim()) return input.toLowerCase();
  return fallback;
}

function toTitleCaseSlug(slug: string) {
  return slug
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

/* =========================================================
 * Demo Products（临时）
 * ========================================================= */
const DEMO_PRODUCTS: DoorProductCardData[] = [
  {
    id: "a-2001",
    name: "Signature Entry Door (Residential)",
    image: "/images/in-stock/d3001.jpg",
    availability: "Now",
    style: "Modern",
    doorType: "Single door",
    widthIn: 42,
    heightIn: 96,
    glass: "Clear",
    onSale: false,
  },
  {
    id: "a-2002",
    name: "Storefront System (Commercial)",
    image: "/images/in-stock/d3002.jpg",
    availability: "6-8 weeks",
    style: "Contemporary",
    doorType: "Double door",
    widthIn: 72,
    heightIn: 96,
    glass: "Tempered",
    onSale: true,
  },
];

/* =========================================================
 * SEO Metadata
 * ========================================================= */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { application } = await params;
  const key = resolveApplicationKey(application);

  const cfg = APPLICATION_CONFIG[key];
  const title = cfg?.title ?? `${toTitleCaseSlug(key)} Doors`;
  const description =
    cfg?.intro ?? "Browse doors by application. Compare solutions for different spaces.";

  return {
    title: `${title} | Abby Iron Doors`,
    description,
    alternates: { canonical: `/doors/application/${key}` },
    robots: { index: true, follow: true },
  };
}

/* =========================================================
 * Page
 * ========================================================= */
export default async function Page({ params }: PageProps) {
  const { application } = await params;
  const key = resolveApplicationKey(application);
  const cfg = APPLICATION_CONFIG[key];

  const title = cfg?.title ?? `${toTitleCaseSlug(key)} Doors`;
  const intro = cfg?.intro ?? "Browse doors by application.";
  const whatTitle = cfg?.whatTitle ?? `What are ${toTitleCaseSlug(key)} doors?`;
  const whatBody = cfg?.whatBody ?? "Learn about this application category.";

  const FiltersSlot = <DoorInStockFilters products={[]} />;

  const ResultsSlot = (
    <DoorProductGrid
      products={DEMO_PRODUCTS}
      emptyText="No doors found for this application."
    />
  );

  return (
    <>
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Doors", item: "/doors" },
              {
                "@type": "ListItem",
                position: 3,
                name: "By Application",
                item: "/doors/application",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: title,
                item: `/doors/application/${key}`,
              },
            ],
          }),
        }}
      />

      <DoorLandingTemplate
        title={title}
        intro={intro}
        bannerImage={cfg?.bannerImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Doors", href: "/doors" },
          { label: "By Application", href: "/doors/application" },
          { label: title, href: `/doors/application/${key}` },
        ]}
        FiltersSlot={FiltersSlot}
        ResultsSlot={ResultsSlot}
        resultsCountText={`Showing ${DEMO_PRODUCTS.length} results`}
        whatTitle={whatTitle}
        whatBody={whatBody}
        whatImage={cfg?.whatImage}
      />
    </>
  );
}
