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
  "swinging-doors": {
    title: "Swinging Doors",
    intro:
      'Swinging doors are a timeless and highly functional door solution, offering exceptional durability, design flexibility, and everyday convenience.\n\nAt Abby Iron Doors, our custom steel and aluminum swing doors are engineered for strength, security, and architectural impact—making them one of the most popular choices for luxury residential and commercial properties.',
    whatTitle: "What are swinging doors?",
    whatBody:
      'A swing door is a traditional hinged door that opens inward or outward by rotating on side-mounted hinges. It is one of the most common and reliable door styles used for front entry doors, patio doors, side entrances, and interior-exterior transitions in both residential and commercial properties.\n\nAt Abby Iron Doors, we manufacture custom swing doors in steel and aluminum, engineered for strength, durability, and architectural elegance.',
    bannerImage: "/images/placeholder/banner-swinging.jpg",
    whatImage: "/images/placeholder/what-swinging.jpg",
  },

  "sliding-doors": {
    title: "Sliding Doors",
    intro:
      'Sliding doors are the ideal solution for homeowners seeking modern design, expansive views, and seamless indoor-outdoor living.\n\nAt Abby Iron Doors, our custom steel and aluminum sliding door systems combine clean architectural lines with advanced engineering to deliver strength, efficiency, and luxury performance.',
    whatTitle: "What are sliding doors?",
    whatBody:
      'A sliding door is a door system that opens horizontally by gliding along a track, rather than swinging on hinges. Sliding doors are designed to maximize natural light, outdoor views, and usable interior space, making them ideal for patios, terraces, balconies, and modern indoor-outdoor living areas.\n\nAt Abby Iron Doors, we design and manufacture custom steel and aluminum sliding doors that combine refined aesthetics with smooth performance and structural integrity.',
    bannerImage: "/images/placeholder/banner-sliding.jpg",
    whatImage: "/images/placeholder/what-sliding.jpg",
  },

  "folding-doors": {
    title: "Folding Doors",
    intro:
      'Folding doors are the ultimate solution for homeowners who want maximum opening width, modern design, and seamless indoor-outdoor living.\n\nAt Abby Iron Doors, our custom steel and aluminum bi-fold door systems are engineered to deliver expansive openings, smooth operation, and striking architectural presence.',
    whatTitle: "What are folding doors?",
    whatBody:
      'A folding door—also known as a bi-fold door—is a multi-panel door system that opens by folding panels together and stacking them to one side or both sides of an opening. Folding doors are designed to create wide, unobstructed openings, seamlessly connecting indoor and outdoor spaces.\n\nAt Abby Iron Doors, we design and manufacture custom steel and aluminum folding doors engineered for smooth operation, structural integrity, and architectural impact.',
    bannerImage: "/images/placeholder/banner-folding.jpg",
    whatImage: "/images/placeholder/what-folding.jpg",
  },

  "pivot-doors": {
    title: "Pivot Doors",
    intro:
      'Pivot doors are the ultimate statement in modern architecture, combining bold design, smooth movement, and exceptional structural performance.\n\nAt Abby Iron Doors, our custom steel and aluminum pivot doors are engineered for grand entrances, delivering unmatched visual impact, strength, and precision craftsmanship.',
    whatTitle: "What are pivot doors?",
    whatBody:
      'A pivot door is a modern door system that rotates on a pivot hinge mounted at the top and bottom of the door, rather than traditional side hinges. This design allows for larger, heavier, and more dramatic doors, making pivot doors a popular choice for luxury front entrances and architectural statement openings.\n\nAt Abby Iron Doors, we design and manufacture custom steel and aluminum pivot doors engineered for precision balance, smooth operation, and striking visual impact.',
    bannerImage: "/images/placeholder/banner-pivot.jpg",
    whatImage: "/images/placeholder/what-pivot.jpg",
  },

  "wine-cellar-doors": {
    title: "Wine Cellar Doors",
    intro:
      'Wine cellar doors are essential for preserving wine quality while elevating the elegance of your space.\n\nAt Abby Iron Doors, our custom steel and aluminum wine cellar doors are designed to combine temperature control, airtight performance, and refined aesthetics—making them ideal for both residential and commercial wine collections.',
    whatTitle: "What are wine cellar doors?",
    whatBody:
      'A wine cellar door is a specialty door designed to enclose and protect a wine storage space while maintaining temperature stability, humidity control, and visual elegance. Wine cellar doors often feature glass panels to showcase the wine collection while providing a secure, climate-controlled barrier.\n\nAt Abby Iron Doors, we design and manufacture custom steel and aluminum wine cellar doors that balance performance with refined architectural design.',
    bannerImage: "/images/placeholder/banner-wine.jpg",
    whatImage: "/images/placeholder/what-wine.jpg",
  },
};

/* =========================================================
 * Helpers
 * ========================================================= */
function resolveCategoryKey(input: unknown, fallback = "swinging-doors"): string {
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
    name: "Classic Swinging Double Door",
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
    name: "Modern Swinging Single Door",
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
