// src/components/doors/filters/ui/AccordionSection.tsx
"use client";

import type { ReactNode } from "react";

export function AccordionSection({
  title,
  isOpen,
  toggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 pb-3 mb-3 select-none">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between cursor-pointer"
      >
        <h3 className="text-[13px] font-semibold tracking-wider text-gray-700">
          {title}
        </h3>

        <span
          className="inline-block transition-transform duration-200"
          style={{
            width: 8,
            height: 8,
            borderRight: "2px solid #111",
            borderBottom: "2px solid #111",
            transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)",
          }}
        />
      </button>

      <div
        className={`transition-all overflow-hidden ${
          isOpen ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
