// src/config/navMegaMenu.ts

export type MegaItem = {
  label: string;
  href: string;
  icon?: string;
};

export const DOORS_MEGA = {
  sections: [
    // ---------------------------
    // 1️⃣ By Product Type（主入口，SEO & 用户心智第一层）
    // ---------------------------
    {
      key: "by-type",
      title: "By Product Type",
      items: [
        { label: "French Doors", href: "/doors/french-doors" },
        { label: "Sliding Doors", href: "/doors/sliding-doors" },
        { label: "Folding Doors", href: "/doors/folding-doors" },
        { label: "Pivot Doors", href: "/doors/pivot-doors" },
        { label: "Wine Cellar Doors", href: "/doors/wine-cellar-doors" },
      ],
    },

    // ---------------------------
    // 2️⃣ By Material（二级入口 / 将来可升级为 filters）
    // ---------------------------
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

    // ---------------------------
    // 3️⃣ All Doors（兜底入口）
    // ---------------------------
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
