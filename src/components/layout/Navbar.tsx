// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { DESIGN_STUDIOS, SERVICE_AREAS } from "@/config/locations";
import MegaMenu from "@/components/layout/MegaMenu";
import { DOORS_MEGA } from "@/config/navMegaMenu";

/* ===================== Marvin-style Chevron ===================== */
function ChevronDown({
  open,
}: {
  open: boolean;
}) {
  return (
    <svg
      className={`ml-1 inline-block h-[18px] w-[18px] transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "/";

  /* ===================== Mega Menu State ===================== */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);

  /* ===================== Inspiration Menu State ===================== */
  const inspirationRef = useRef<HTMLDivElement | null>(null);

  const closeNow = () => {
    setOpenMenu(null);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (openMenu !== "inspiration") return;
      const el = inspirationRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [openMenu]);

  /* ===================== Locations State ===================== */
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
      {/* ===================== Utility Bar ===================== */}
      <div className="w-full bg-black">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-end px-6 text-xs text-gray-300">
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setIsLocationsOpen(true)}
            onMouseLeave={() => setIsLocationsOpen(false)}
          >
            <Link href="/locations" className="hover:text-white">
              Locations
            </Link>

            {isLocationsOpen && (
              <div className="absolute left-1/2 top-full z-[10000] w-screen -translate-x-1/2">
                <div className="h-3 w-full" />
                <div className="relative bg-[#b79a6b] shadow-2xl">
                  <div className="absolute left-1/2 -top-2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#b79a6b]" />
                  <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="grid grid-cols-6 gap-10 text-sm text-white/90">
                      <div className="col-span-2">
                        <div className="mb-4 text-xs font-semibold tracking-widest">
                          DESIGN STUDIOS
                        </div>
                        <div className="flex flex-col gap-3">
                          {DESIGN_STUDIOS.map((studio) => (
                            <Link
                              key={studio.slug}
                              href={`/locations/${studio.slug}`}
                              className="font-semibold text-white hover:underline underline-offset-8"
                              onClick={() => setIsLocationsOpen(false)}
                            >
                              {studio.name.toUpperCase()}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-4">
                        <div className="mb-4 text-xs font-semibold tracking-widest">
                          SERVICE AREAS
                        </div>
                        <div className="grid grid-cols-3 gap-10">
                          {SERVICE_AREAS.map((group) => (
                            <div key={group.state}>
                              <div className="mb-3 text-xs font-semibold">
                                {group.state.toUpperCase()}
                              </div>
                              <div className="flex flex-col gap-2">
                                {group.cities.map((city) => (
                                  <Link
                                    key={city}
                                    href={`/locations/${group.stateSlug}/${city
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    className="hover:text-white hover:underline underline-offset-4"
                                    onClick={() =>
                                      setIsLocationsOpen(false)
                                    }
                                  >
                                    {city}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="mx-3 text-gray-500">|</span>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <span className="mx-3 text-gray-500">|</span>
          <Link href="/support" className="hover:text-white">
            Support
          </Link>
          <span className="mx-3 text-gray-500">|</span>
          <Link href="/sign-in" className="font-medium hover:text-white">
            Sign-in
          </Link>
        </div>
      </div>

      {/* ===================== Main Navbar ===================== */}
      <div className="w-full bg-[#f4f4f4]">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-10 px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/Abby-New-Logo-1.jpg"
              alt="Abby Iron Doors Logo"
              width={260}
              height={80}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>

          <nav className="flex items-center gap-6 text-sm md:gap-8">
            {/* ===== Doors (Marvin-style) ===== */}
            <div
              className="relative"
              onMouseEnter={() => setHoverMenu("doors")}
              onMouseLeave={() => setHoverMenu(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenMenu(openMenu === "doors" ? null : "doors")
                }
                className={`group relative flex h-16 items-center px-1 ${
                  isActive("/doors")
                    ? "font-semibold text-black"
                    : "text-gray-700"
                } hover:text-black`}
              >
                <span className="inline-flex items-center">
                  <span>Doors</span>
                  <ChevronDown open={openMenu === "doors"} />
                </span>

                {/* Yellow underline */}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[5px] translate-y-[1px] bg-[#f2c200] transition-opacity ${
                    openMenu === "doors" || hoverMenu === "doors"
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </button>
            </div>

            {["windows", "in-stock", "collections" ].map(
              (x) => (
                <Link
                  key={x}
                  href={`/${x}`}
                  className={`relative flex h-16 items-center px-1 ${
                    isActive(`/${x}`)
                      ? "font-semibold text-black"
                      : "text-gray-700"
                  } hover:text-black`}
                >
                  {x.replace("-", " ").replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  )}
                </Link>
              )
            )}

            {/* ===== Inspiration (Marvin-style 2-state) ===== */}
            <div
              ref={inspirationRef}
              className="relative"
              onMouseEnter={() => setHoverMenu("inspiration")}
              onMouseLeave={() => setHoverMenu(null)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openMenu === "inspiration"}
                onClick={() =>
                  setOpenMenu(openMenu === "inspiration" ? null : "inspiration")
                }
                className={`group relative flex h-16 items-center px-1 ${
                  isActive("/inspiration")
                    ? "font-semibold text-black"
                    : "text-gray-700"
                } hover:text-black`}
              >
                <span className="inline-flex items-center">
                  <span>Inspiration</span>
                  <ChevronDown open={openMenu === "inspiration"} />
                </span>

                {/* Yellow underline: hover 或 open 都显示 */}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[5px] translate-y-[1px] bg-[#f2c200] transition-opacity ${
                    openMenu === "inspiration" || hoverMenu === "inspiration"
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </button>

              {/* Dropdown panel: 只在 click open 时出现 */}
              {openMenu === "inspiration" && (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-[10000] w-[200px] bg-[#f4f4f4]"
                >
                  <div className="py-2">
                    {[
                      { label: "Blog", href: "/inspiration/blog" },
                      { label: "Brand Experience Center", href: "/inspiration/brand-experience-center" },
                      { label: "Photo Gallery", href: "/inspiration/photo-gallery" },
                      { label: "Product Design Options", href: "/inspiration/product-design-options" },
                      { label: "Product Catalogs", href: "/inspiration/product-catalogs" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="block px-6 py-3 text-sm text-gray-900 hover:bg-black/5"
                        onClick={() => setOpenMenu(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/get-quote"
              className="ml-3 inline-flex items-center rounded-full border border-black px-4 py-1.5 text-xs font-semibold uppercase hover:bg-black hover:text-white"
            >
              GET QUOTE
            </Link>
          </nav>
        </div>
      </div>

      {/* ===================== Doors Mega Menu ===================== */}
      <MegaMenu
        open={openMenu === "doors"}
        onClose={closeNow}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        sections={DOORS_MEGA.sections}
        feature={DOORS_MEGA.feature}
        topOffsetPx={96}
      />
    </header>
  );
}
