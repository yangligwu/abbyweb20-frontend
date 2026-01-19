// src/config/navMegaMenu.ts

export type MegaItem = {
  label: string;
  href: string;
  icon?: string;
};

export const DOORS_MEGA = {
  sections: [
    {
      key: "by-type",
      title: "By Product Type",
      items: [
        { label: "Swinging Doors", href: "/doors/swinging-doors" },
        { label: "Sliding Doors", href: "/doors/sliding-doors" },
        { label: "Folding Doors", href: "/doors/folding-doors" },
        { label: "Pivot Doors", href: "/doors/pivot-doors" },
        { label: "Wine Cellar Doors", href: "/doors/wine-cellar-doors" },
      ],
    },

    {
      key: "by-material",
      title: "By Material",
      items: [
        { label: "Aluminum Doors", href: "/doors/material/aluminum" },
        { label: "Steel Doors", href: "/doors/material/steel" },
        { label: "Wrought Iron Doors", href: "/doors/material/wrought-iron" },
        { label: "Glass-Heavy Doors", href: "/doors/material/glass-heavy" },
      ],
    },

    // ✅ 新增：By Application（放到第 3 个）
    {
      key: "by-application",
      title: "By Application",
      items: [
        { label: "Residential", href: "/doors/application/residential" },
        { label: "Commercial", href: "/doors/application/commercial" },
      ],
    },

    {
      key: "all-doors",
      title: "All Doors",
      items: [{ label: "Browse all doors", href: "/doors" }],
    },
  ],

  // ---------------------------
  // 右侧 Feature（保持不变，完全 OK）
  // ---------------------------
  feature: {
    eyebrow: "Inspiration",
    title: "Breathtaking Bayview Home",
    href: "/inspiration/breathtaking-bayview-home",
    imageSrc: "/menu/feature-bayview.jpg",
  },
};

console.log(
  "[navMegaMenu.ts LOADED]",
  DOORS_MEGA.sections.map(s => s.key)
);