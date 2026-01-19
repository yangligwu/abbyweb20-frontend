// src/app/(site)/doors/page.tsx
import Link from "next/link";

export default function DoorsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">Doors</h1>
      <p className="mb-10 max-w-2xl text-gray-600">
        Explore our premium iron door collections by type, material, application, and design.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Link
          href="/doors/by-type"
          className="rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
        >
          <h2 className="text-xl font-semibold">By Type</h2>
          <p className="mt-1 text-sm text-gray-600">
            Bi-Fold, Sliding, Entry, Multi-Slide and more.
          </p>
        </Link>

        <Link
          href="/doors/by-material"
          className="rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
        >
          <h2 className="text-xl font-semibold">By Material</h2>
          <p className="mt-1 text-sm text-gray-600">
            Aluminum, Steel, Wrought Iron, Glass-heavy designs.
          </p>
        </Link>

        <Link
          href="/doors/application/residential"
          className="rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
        >
          <h2 className="text-xl font-semibold">By Application</h2>
          <p className="mt-1 text-sm text-gray-600">
            Residential and Commercial solutions.
          </p>
        </Link>

        <Link
          href="/doors/all"
          className="rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
        >
          <h2 className="text-xl font-semibold">All Doors</h2>
          <p className="mt-1 text-sm text-gray-600">
            Browse the complete Abby Iron Doors catalog.
          </p>
        </Link>
      </div>
    </section>
  );
}
