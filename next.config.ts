// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ---------------------------
      // ✅ Doors: old by-type URLs -> new canonical category URLs
      // ---------------------------
      {
        source: "/doors/by-type/swinging",
        destination: "/doors/swinging-doors",
        permanent: true,
      },
      {
        source: "/doors/by-type/sliding",
        destination: "/doors/sliding-doors",
        permanent: true,
      },
      {
        source: "/doors/by-type/folding",
        destination: "/doors/folding-doors",
        permanent: true,
      },
      {
        source: "/doors/by-type/pivot",
        destination: "/doors/pivot-doors",
        permanent: true,
      },
      {
        source: "/doors/by-type/wine-cellar",
        destination: "/doors/wine-cellar-doors",
        permanent: true,
      },

      // ---------------------------
      // ✅ Doors: old by-material URLs -> new material URLs
      // ---------------------------
      {
        source: "/doors/by-material/aluminum",
        destination: "/doors/material/aluminum",
        permanent: true,
      },
      {
        source: "/doors/by-material/steel",
        destination: "/doors/material/steel",
        permanent: true,
      },
      {
        source: "/doors/by-material/wrought-iron",
        destination: "/doors/material/wrought-iron",
        permanent: true,
      },
      {
        source: "/doors/by-material/glass-heavy",
        destination: "/doors/material/glass-heavy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
