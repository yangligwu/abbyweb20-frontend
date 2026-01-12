// src/components/doors/grid/DoorProductGrid.tsx
import React from "react";
import { DoorProductCard, type DoorProductCardData } from "./DoorProductCard";

export function DoorProductGrid({
  products,
  emptyText = "No products match your selection. Try adjusting your filters.",
  headerLeft,
}: {
  products: DoorProductCardData[];
  emptyText?: string;
  headerLeft?: React.ReactNode;
}) {
  return (
    <div>
      {headerLeft ? <div className="mb-4">{headerLeft}</div> : null}

      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-12 text-sm">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <DoorProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
