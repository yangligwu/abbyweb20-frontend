// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abby Iron Doors 2.0",
  description: "Abby Iron Doors Website - Next.js 15 App Router",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col pt-16`}
      >
        {/* 固定导航栏 */}
        <Navbar />

        {/* 主内容区域 */}
        <main className="flex-1">{children}</main>

        {/* 全局底部 */}
        <Footer />
      </body>
    </html>
  );
}
