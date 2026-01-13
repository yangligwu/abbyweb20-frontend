// src/app/doors/[category]/page.tsx
import type { Metadata } from "next";
import DoorLandingTemplate from "@/components/doors/DoorLandingTemplate";
import { DoorInStockFilters } from "@/components/doors/filters/DoorInStockFilters";
import { DoorProductGrid } from "@/components/doors/grid/DoorProductGrid";
import type { DoorProductCardData } from "@/components/doors/grid/DoorProductCard";

/* =========================================================
 * Types
 * ========================================================= */
type RouteParams = {
  category?: string;
};

type PageProps = {
  // Next.js 15/16: params is a Promise in Server Components
  params: Promise<RouteParams>;
};

type CategoryConfig = {
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
const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  "french-doors": {
    title: "French Doors",
    intro:
      "Explore French door styles featuring classic symmetry, expansive glass, and elegant proportions. Compare configurations, finishes, and performance options.",
    whatTitle: "What are French doors?",
    whatBody:
      "French doors are characterized by multiple glass panels and a symmetrical double-door design. They are commonly used to connect interior and exterior spaces while maximizing light and visual openness.",
    bannerImage: "/images/placeholder/banner-french.jpg",
    whatImage: "/images/placeholder/what-french.jpg",
  },
  "sliding-doors": {
    title: "Sliding Doors",
    intro:
      "Browse sliding door designs that save space while delivering wide openings and smooth operation.",
    whatTitle: "What are sliding doors?",
    whatBody: `A sliding door is a door system that opens horizontally by gliding along a track, rather than swinging on hinges. Sliding doors are designed to maximize natural light, outdoor views, and usable interior space, making them ideal for patios, terraces, balconies, and modern indoor-outdoor living areas.

At Abby Iron Doors, we design and manufacture custom steel and aluminum sliding doors that combine refined aesthetics with smooth performance and structural integrity.`,
    whatImage: "/images/placeholder/what-sliding.jpg",
  },
  "folding-doors": {
    title: "Folding Doors",
    intro: "Discover folding (bi-fold) doors designed to fully open spaces.",
    whatTitle: "What are folding doors?",
    whatBody:
      "Folding doors consist of multiple panels that stack neatly to one or both sides.",
    bannerImage: "/images/placeholder/banner-folding.jpg",
    whatImage: "/images/placeholder/what-folding.jpg",
  },
  "pivot-doors": {
    title: "Pivot Doors",
    intro: "Explore pivot door designs that make a bold architectural statement.",
    whatTitle: "What are pivot doors?",
    whatBody:
      "Pivot doors rotate on a pivot hinge rather than traditional side hinges.",
    bannerImage: "/images/placeholder/banner-pivot.jpg",
    whatImage: "/images/placeholder/what-pivot.jpg",
  },
  "wine-cellar-doors": {
    title: "Wine Cellar Doors",
    intro: "Browse wine cellar doors designed to protect and showcase collections.",
    whatTitle: "What are wine cellar doors?",
    whatBody:
      "Wine cellar doors often combine glass and metal to balance visibility and insulation.",
    bannerImage: "/images/placeholder/banner-wine.jpg",
    whatImage: "/images/placeholder/what-wine.jpg",
  },
};

/* =========================================================
 * Helpers
 * ========================================================= */
function resolveCategoryKey(input: unknown, fallback = "french-doors"): string {
  if (typeof input === "string" && input.trim()) {
    return input.toLowerCase();
  }
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
    id: "c-1001",
    name: "Classic French Double Door",
    image: "/images/in-stock/d3001.jpg",
    availability: "Now",
    style: "Traditional",
    doorType: "Double door",
    widthIn: 72,
    heightIn: 96,
    glass: "Tempered",
    onSale: false,
  },
  {
    id: "c-1002",
    name: "Modern French Single Door",
    image: "/images/in-stock/d3002.jpg",
    availability: "6-8 weeks",
    style: "Modern",
    doorType: "Single door",
    widthIn: 40,
    heightIn: 82,
    glass: "Clear",
    onSale: true,
  },
];

/* =========================================================
 * SEO Metadata
 * ========================================================= */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params; // ✅ await params
  const key = resolveCategoryKey(category);

  const cfg = CATEGORY_CONFIG[key];
  const title = cfg?.title ?? `${toTitleCaseSlug(key)} Doors`;
  const description =
    cfg?.intro ??
    "Browse doors by category. Compare styles, glass options, and configurations.";

  return {
    title: `${title} | Abby Iron Doors`,
    description,
    alternates: { canonical: `/doors/${key}` },
    robots: { index: true, follow: true },
  };
}

/* =========================================================
 * Page
 * ========================================================= */
export default async function Page({ params }: PageProps) {
  const { category } = await params; // ✅ await params
  const key = resolveCategoryKey(category);
  const cfg = CATEGORY_CONFIG[key];

  const title = cfg?.title ?? `${toTitleCaseSlug(key)} Doors`;
  const intro =
    cfg?.intro ??
    "Browse doors by category. Compare styles, glass options, and configurations.";
  const whatTitle = cfg?.whatTitle ?? `What are ${toTitleCaseSlug(key)} doors?`;
  const whatBody =
    cfg?.whatBody ??
    "Learn about this door category’s design characteristics and applications.";

  const FiltersSlot = <DoorInStockFilters products={[]} />;

  const ResultsSlot = (
    <DoorProductGrid
      products={DEMO_PRODUCTS}
      emptyText="No doors found for this category."
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
                name: title,
                item: `/doors/${key}`,
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
          { label: title, href: `/doors/${key}` },
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
