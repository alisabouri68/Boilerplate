// src/app/layout.tsx
import type { Metadata } from "next";
import { RuntimeInitializer } from "@/components/providers/RuntimeInitializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "داشبورد مدیریت | پنل پرو",
  description: "داشبورد حرفه‌ای ساخته‌شده با Next.js و Flowbite React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {/* فقط کامپوننت client اینجا mount می‌شه */}
        <RuntimeInitializer />

        {children}
      </body>
    </html>
  );
}