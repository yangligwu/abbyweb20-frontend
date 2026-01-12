// src/app/(site)/doors/page.tsx

export default function DoorsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">Doors</h1>
      <p className="mb-10 max-w-2xl text-gray-600">
        Explore our premium iron door collections by type, material and design.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <a
          href="/doors/by-type"
          className="rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
        >
          <h2 className="text-xl font-semibold">By Type</h2>
          <p className="mt-1 text-sm text-gray-600">
            Bi-Fold, Sliding, Entry, Multi-Slide and more.
          </p>
        </a>

        <a
          href="/doors/by-material"
          className="rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
        >
          <h2 className="text-xl font-semibold">By Material</h2>
          <p className="mt-1 text-sm text-gray-600">
            Aluminum, Steel, Wrought Iron, Glass-heavy designs.
          </p>
        </a>

        <a
          href="/doors/all"
          className="rounded-lg bg-gray-100 p-6 transition hover:bg-gray-200"
        >
          <h2 className="text-xl font-semibold">All Doors</h2>
          <p className="mt-1 text-sm text-gray-600">
            Browse the complete Abby Iron Doors catalog.
          </p>
        </a>
      </div>
    </section>
  );
}
