// src/components/layout/MegaMenu.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import type { MegaItem } from "@/config/navMegaMenu";

type Section = { key: string; title: string; items: MegaItem[] };

export default function MegaMenu(props: {
  open: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  sections: Section[];
  feature?: { eyebrow: string; title: string; href: string; imageSrc: string };
  topOffsetPx?: number; // 顶部偏移（固定 header 高度）
}) {
  const {
    open,
    onClose,
    onMouseEnter,
    onMouseLeave,
    sections,
    feature,
    topOffsetPx = 96, // Utility(32) + Main(64)
  } = props;

  // ✅ 只在初始 render 时给默认值
  const [activeKey, setActiveKey] = useState<string>(() => {
    return sections.length > 0 ? sections[0].key : "";
  });

  if (!open) return null;

  const active = sections.find((s) => s.key === activeKey) ?? sections[0];

  return (
    <>
      {/* ===================== Backdrop（幕布） ===================== */}
      {/* 只负责 dim 背景，不制造任何边界线 */}
      <div
        className="fixed inset-0 z-[9990] bg-black/35"
        style={{ top: topOffsetPx }}
        onClick={onClose}
      />

      {/* ===================== Panel 容器（无边界、无 shadow） ===================== */}
      <div
        className="fixed left-0 right-0 z-[9991] bg-transparent"
        style={{ top: topOffsetPx }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* ===================== 内容区（shadow 下沉在这里） ===================== */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-b-2xl bg-white py-10 shadow-2xl">
            <div className="grid grid-cols-12 gap-10">
              {/* ===================== Left main list ===================== */}
              <div className="col-span-3">
                <div className="space-y-2">
                  {sections.map((s) => {
                    const isActive = s.key === activeKey;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setActiveKey(s.key)}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition ${
                          isActive
                            ? "bg-gray-100 font-semibold text-black"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        aria-current={isActive ? "true" : "false"}
                      >
                        <span>{s.title}</span>
                        <span className="text-gray-500">›</span>
                      </button>
                    );
                  })}
                </div>

                {/* All Doors 快捷入口 */}
                <div className="mt-6 text-sm">
                  <Link
                    href="/doors"
                    className="font-semibold text-black hover:underline underline-offset-4"
                    onClick={onClose}
                  >
                    View Doors Landing Page →
                  </Link>
                </div>
              </div>

              {/* ===================== Middle items ===================== */}
              <div className="col-span-6">

                <div className="grid grid-cols-2 gap-6">
                  {active.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-xl border p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="h-10 w-10 rounded-lg bg-gray-100" />
                      <div className="font-medium text-gray-900 group-hover:underline underline-offset-4">
                        {it.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ===================== Right feature card ===================== */}
              <div className="col-span-3">
                {feature && (
                  <Link
                    href={feature.href}
                    onClick={onClose}
                    className="block overflow-hidden rounded-2xl border hover:shadow-md"
                  >
                    <div className="aspect-[16/9] w-full bg-gray-100">
                      <img
                        src={feature.imageSrc}
                        alt={feature.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-xs font-semibold tracking-widest text-gray-500">
                        {feature.eyebrow.toUpperCase()}
                      </div>
                      <div className="mt-2 text-base font-semibold text-black">
                        {feature.title}
                      </div>
                      <div className="mt-4 text-sm font-medium text-black">
                        Read more →
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
