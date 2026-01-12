// src/components/doors/grid/DoorProductCard.tsx
import Image from "next/image";
import React from "react";

export type DoorProductCardData = {
  id: string;
  name: string;
  image: string;

  // 可选字段：不同页面来源可能不全
  availability?: "Now" | "6-8 weeks" | string;
  style?: string;
  doorType?: string;
  widthIn?: number;
  heightIn?: number;
  glass?: string;
  onSale?: boolean;
};

export function DoorProductCard({ product }: { product: DoorProductCardData }) {
  const {
    name,
    image,
    availability,
    style,
    doorType,
    widthIn,
    heightIn,
    glass,
    onSale,
  } = product;

  const availabilityText =
    availability === "Now"
      ? "Ready to ship now"
      : availability === "6-8 weeks"
      ? "Ships in 6–8 weeks"
      : availability;

  const availabilityClass =
    availability === "Now"
      ? "text-emerald-600"
      : availability === "6-8 weeks"
      ? "text-amber-600"
      : "text-neutral-600";

  return (
    <article className="border border-gray-300 rounded-sm shadow-sm bg-white overflow-hidden hover:shadow-lg transition duration-200">
      {/* 图片 */}
      <div className="relative w-full pb-[75%] bg-gray-100">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* 文本 */}
      <div className="p-4 text-[13px] text-gray-800">
        <h3 className="font-medium mb-1">{name}</h3>

        {(style || doorType) && (
          <p className="text-xs text-gray-500 mb-1">
            {[style, doorType].filter(Boolean).join(" · ")}
          </p>
        )}

        {(widthIn || heightIn || glass) && (
          <p className="text-xs text-gray-500 mb-2">
            {widthIn ? `${widthIn}″ W` : ""}
            {widthIn && heightIn ? " × " : ""}
            {heightIn ? `${heightIn}″ H` : ""}
            {glass ? ` · ${glass} glass` : ""}
          </p>
        )}

        <div className="mt-1 flex items-center justify-between text-[11px]">
          {availabilityText ? (
            <span className={`${availabilityClass} font-semibold`}>
              {availabilityText}
            </span>
          ) : (
            <span />
          )}

          {onSale ? (
            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white uppercase tracking-wide text-[10px]">
              BIG DEAL
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
