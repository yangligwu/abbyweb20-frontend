import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Doors by Application</h1>
      <p className="mt-3 text-neutral-600">
        Choose an application category.
      </p>

      <div className="mt-8 flex gap-4">
        <Link className="rounded-full border px-4 py-2" href="/doors/application/residential">
          Residential
        </Link>
        <Link className="rounded-full border px-4 py-2" href="/doors/application/commercial">
          Commercial
        </Link>
      </div>
    </main>
  );
}