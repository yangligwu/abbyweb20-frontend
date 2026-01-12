// src/app/sitemap.ts

import { MetadataRoute } from "next";
import {
  DESIGN_STUDIOS,
  LOCATION_SERVICES,
} from "@/config/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://abbyirondoors.com";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  /* =========================
     1️⃣ 首页（最高权重）
  ========================= */
  entries.push({
    url: `${BASE_URL}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  /* =========================
     2️⃣ 核心静态页（品牌/转化）
     （保留你原来的）
  ========================= */
  const staticRoutes = [
    "/locations",
    "/doors",
    "/windows",
    "/in-stock",
    "/collections",
    "/inspiration",
    "/get-quote",
  ];

  staticRoutes.forEach((path) => {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6, // ⬅️ 降权：这些是集合页，不是 SEO 主战场
    });
  });

  /* =========================
     3️⃣ 门店页（LocalBusiness）
     /locations/{studio-slug}
  ========================= */
  for (const studio of DESIGN_STUDIOS) {
    entries.push({
      url: `${BASE_URL}/locations/${studio.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8, // ⬅️ 本地 SEO 核心页
    });
  }

  /* =========================
     4️⃣ 城市 × 服务页（转化页）
     /locations/{citySlug}/{serviceSlug}
  ========================= */
  for (const studio of DESIGN_STUDIOS) {
    for (const service of LOCATION_SERVICES) {
      entries.push({
        url: `${BASE_URL}/locations/${studio.citySlug}/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7, // ⬅️ 搜索转化页
      });
    }
  }

  return entries;
}
