import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeModeScript } from "flowbite-react"; 
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
});

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
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.className} bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100`}
      >
        <ThemeModeScript />
        {children}
      </body>
    </html>
  );
}