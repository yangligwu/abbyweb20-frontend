// src/components/doors/filters/ui/RangeSliderPro.tsx
"use client";

import { Range, getTrackBackground } from "react-range";

export function RangeSliderPro({
  min,
  max,
  step = 1,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const [minVal, maxVal] = value;

  const percent = (v: number) => ((v - min) / (max - min)) * 100;
  const clamp = (p: number) => Math.min(Math.max(p, 8), 92);

  return (
    <div className="relative py-6">
      {/* 左值 */}
      <div
        className="absolute -top-1 text-xs text-gray-700"
        style={{
          left: `${clamp(percent(minVal))}%`,
          transform: "translateX(-20%)",
        }}
      >
        {minVal}″
      </div>

      {/* 右值 */}
      <div
        className="absolute -top-1 text-xs text-gray-700"
        style={{
          left: `${clamp(percent(maxVal))}%`,
          transform: "translateX(-80%)",
        }}
      >
        {maxVal}″
      </div>

      <Range
        values={value}
        min={min}
        max={max}
        step={step}
        onChange={(vals) => onChange([vals[0], vals[1]])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-1 rounded-full"
            style={{
              background: getTrackBackground({
                values: value,
                colors: ["#ccc", "#f6a800", "#ccc"],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
          const { key, ...rest } = props;
          return (
            <div
              key={key}
              {...rest}
              className="h-4 w-4 rounded-full bg-[#f6a800] border-2 border-white shadow"
            />
          );
        }}
      />
    </div>
  );
}
