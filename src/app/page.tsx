// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero 区域 */}
      <section className="relative h-[520px] overflow-hidden">
        {/* 背景图 */}
        <img
          src="/Custom-Iron-Gate-Doors-LV_1920_980.jpeg"
          alt="Abby iron doors with mountain view"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* 半透明遮罩 */}
        <div className="absolute inset-0 bg-black/35" />

        {/* 文案层 */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-xl text-white">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase">
              Abby Iron Doors 2.0
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
              Modern iron doors for
              <br />
              light-filled living spaces.
            </h1>

            <p className="mt-4 text-sm text-gray-100/90 md:text-base">
              Custom-designed iron and glass doors that frame the perfect view —
              engineered for security, performance, and timeless aesthetics.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/doors/by-type/bi-fold"
                className="rounded-full bg-white px-6 py-2 font-medium text-black hover:bg-gray-100"
              >
                Explore Bi-Fold Doors
              </Link>

              <Link
                href="/doors"
                className="rounded-full border border-white/80 px-6 py-2 font-medium text-white hover:bg-white/10"
              >
                View all collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 下方 Next Steps 卡片（延续你原来的内容） */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-lg bg-gray-100 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Next Steps</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Build the new homepage hero section (完成 ✅)</li>
            <li>Add product catalog components</li>
            <li>Connect Django backend API later</li>
            <li>Design responsive layout (desktop + mobile)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
