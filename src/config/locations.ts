// src/config/locations.ts

/* =========================
   Design Studio（Location Hub）
========================= */

export type DesignStudio = {
  slug: string;           // e.g. "charlotte-design-studio"
  name: string;          // e.g. "Charlotte Design Studio"
  city: string;          // e.g. "Charlotte"
  citySlug: string;

  heroImage?: string;
  introTitle?: string;
  introText?: string;
};

export const DESIGN_STUDIOS: DesignStudio[] = [
  {
    slug: "charlotte-design-studio",
    name: "Charlotte Design Studio",
    city: "Charlotte",
    citySlug: "charlotte",
    heroImage: "/locations/charlotte-hero.jpg",
    introTitle: "The Best Custom Iron Doors in Charlotte",
    introText:
      "Abby Iron Doors brings custom craftsmanship and modern engineering to Charlotte homes.",
  },
  {
    slug: "raleigh-design-studio",
    name: "Raleigh Design Studio",
    city: "Raleigh",
    citySlug: "raleigh",
    heroImage: "/locations/raleigh-hero.jpg",
    introTitle: "The Best Custom Iron Doors in Raleigh",
    introText:
      "Our Raleigh Design Studio works closely with homeowners and builders across the Triangle.",
  },
  {
    slug: "atlanta-design-studio",
    name: "Atlanta Design Studio",
    city: "Atlanta",
    citySlug: "atlanta",
    heroImage: "/locations/atlanta-hero.jpg",
    introTitle: "The Best Custom Iron Doors in Atlanta",
    introText:
      "Abby Iron Doors brings decades of craftsmanship and modern engineering to homes across the Greater Atlanta area.",
  },
];

/* =========================
   Service Areas（Support Cities）
========================= */

export type ServiceAreaGroup = {
  state: string;
  stateSlug: string;
  cities: string[];
};

export const SERVICE_AREAS: ServiceAreaGroup[] = [
  {
    state: "North Carolina",
    stateSlug: "nc",
    cities: [
      "Davidson",
      "Matthews",
      "Mooresville",
      "Waxhaw",
      "Apex",
      "Chapel Hill",
      "Cary",
      "Durham",
      "Wake Forest",
    ],
  },
  {
    state: "South Carolina",
    stateSlug: "sc",
    cities: ["Charleston", "Greenville"],
  },
  {
    state: "Georgia",
    stateSlug: "ga",
    cities: [
      "Alpharetta",
      "Brookhaven",
      "Johns Creek",
      "Peachtree City",
      "Roswell",
      "Sandy Springs",
    ],
  },
];

/* =========================
   Location × Service（SEO Expansion Layer）
   Step 5D-1
========================= */

export type LocationService = {
  slug: string;          // e.g. "custom-iron-doors"
  name: string;          // e.g. "Custom Iron Doors"
  description: string;
};

export const LOCATION_SERVICES: LocationService[] = [
  {
    slug: "custom-iron-doors",
    name: "Custom Iron Doors",
    description:
      "Handcrafted custom iron doors designed for security, durability, and luxury homes.",
  },
  {
    slug: "iron-entry-doors",
    name: "Iron Entry Doors",
    description:
      "Elegant iron entry doors that enhance curb appeal and provide superior protection.",
  },
  {
    slug: "custom-iron-windows",
    name: "Custom Iron Windows",
    description:
      "Custom iron windows designed to complement luxury architecture and improve security.",
  },
];
