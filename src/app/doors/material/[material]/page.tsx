// src/app/doors/material/[material]/page.tsx
import type { Metadata } from "next";
import DoorLandingTemplate from "@/components/doors/DoorLandingTemplate";
import { DoorInStockFilters } from "@/components/doors/filters/DoorInStockFilters";
import { DoorProductGrid } from "@/components/doors/grid/DoorProductGrid";
import type { DoorProductCardData } from "@/components/doors/grid/DoorProductCard";

/* =========================================================
 * Types
 * ========================================================= */
type PageProps = {
  params?: { material?: string };
};

type MaterialConfig = {
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
const MATERIAL_CONFIG: Record<string, MaterialConfig> = {
  aluminum: {
    title: "Aluminum Doors",
    intro:
      "Explore aluminum door designs that balance clean lines, durability, and low maintenance. Compare styles, glass options, and finishes to fit your project.",
    whatTitle: "What are aluminum doors?",
    whatBody:
      "Aluminum doors are valued for their strength-to-weight ratio, corrosion resistance, and modern aesthetics. They work well in contemporary designs and can be paired with various glass options for light and visibility.",
    bannerImage: "/images/placeholder/banner-aluminum.jpg",
    whatImage: "/images/placeholder/what-aluminum.jpg",
  },
  steel: {
    title: "Steel Doors",
    intro:
      "Browse steel door styles that emphasize security, strength, and timeless character. Filter by style, glass, and finish to match your home’s architecture.",
    whatTitle: "What are steel doors?",
    whatBody:
      "Steel doors are known for their strength and security. Depending on configuration and glazing, they can offer an elegant look while maintaining robust performance.",
    bannerImage: "/images/placeholder/banner-steel.jpg",
    whatImage: "/images/placeholder/what-steel.jpg",
  },
  "wrought-iron": {
    title: "Wrought Iron Doors",
    intro:
      "Discover wrought iron doors featuring handcrafted patterns and premium curb appeal.",
    whatTitle: "What are wrought iron doors?",
    whatBody:
      "Wrought iron doors highlight decorative metalwork and premium presence, often paired with glass for balance of security and elegance.",
    bannerImage: "/images/placeholder/banner-iron.jpg",
    whatImage: "/images/placeholder/what-iron.jpg",
  },
  "glass-heavy": {
    title: "Glass-Heavy Doors",
    intro:
      "Explore door designs that prioritize light and visibility with larger glazing areas.",
    whatTitle: "What are glass-heavy doors?",
    whatBody:
      "Glass-heavy doors are designed to maximize daylight while balancing privacy and energy performance.",
    bannerImage: "/images/placeholder/banner-glass.jpg",
    whatImage: "/images/placeholder/what-glass.jpg",
  },
};

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
    id: "m-1001",
    name: "Modern Aluminum Single Door",
    image: "/images/in-stock/d1001.jpg",
    availability: "Now",
    style: "Modern",
    doorType: "Single door",
    widthIn: 40,
    heightIn: 82,
    glass: "Tempered",
    onSale: false,
  },
  {
    id: "m-1002",
    name: "Steel Double Door – Arch",
    image: "/images/in-stock/d2001.jpg",
    availability: "6-8 weeks",
    style: "Traditional",
    doorType: "Double door",
    widthIn: 72,
    heightIn: 96,
    glass: "Impact",
    onSale: true,
  },
];

/* =========================================================
 * SEO Metadata
 * ========================================================= */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const key = params?.material?.toLowerCase() ?? "";
  const cfg = MATERIAL_CONFIG[key];

  const title = cfg?.title ?? "Doors by Material";
  const description =
    cfg?.intro ??
    "Browse doors by material. Compare designs, finishes, and performance options.";

  return {
    title: `${title} | Abby Iron Doors`,
    description,
    alternates: { canonical: `/doors/material/${key}` },
    robots: { index: true, follow: true },
  };
}

/* =========================================================
 * Page
 * ========================================================= */
export default function Page({ params }: PageProps) {
  const key = params?.material?.toLowerCase() ?? "";
  const cfg = MATERIAL_CONFIG[key];

  const title = cfg?.title ?? "Doors by Material";
  const intro =
    cfg?.intro ??
    "Browse doors by material. Compare designs, finishes, and performance options.";
  const whatTitle =
    cfg?.whatTitle ?? "What are doors by material?";
  const whatBody =
    cfg?.whatBody ??
    "Learn about door materials, their benefits, and typical applications.";

  const FiltersSlot = <DoorInStockFilters products={[]} />;

  const ResultsSlot = (
    <DoorProductGrid
      products={DEMO_PRODUCTS}
      emptyText="No doors found for this material."
    />
  );

  return (
    <>
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
                name: "By Material",
                item: "/doors/material",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: title,
                item: `/doors/material/${key}`,
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
          { label: "By Material", href: "/doors/material" },
          { label: title, href: `/doors/material/${key}` },
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
