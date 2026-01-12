// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Abby Iron Doors. All Rights Reserved.
      </div>
    </footer>
  );
}
