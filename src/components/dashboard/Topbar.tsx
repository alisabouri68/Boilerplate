"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  TextInput,
} from "flowbite-react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineMenuAlt2,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCog,
  HiX,
} from "react-icons/hi";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/dashboard", label: "داشبورد" },
  { href: "/dashboard/frontend", label: "فرانت‌اند" },
  { href: "/dashboard/backend", label: "بک‌اند" },
  { href: "/dashboard/database", label: "دیتابیس" },
  { href: "/dashboard/components", label: "کامپوننت‌ها" },
  { href: "/dashboard/docs", label: "مستندات" },
];

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" || href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        {/* دکمه سایدبار موبایل */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="سایدبار"
        >
          <HiOutlineMenuAlt2 className="h-6 w-6" />
        </button>

        {/* برند */}
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white shadow-md shadow-blue-500/30">
            پ
          </div>
          <span className="hidden text-base font-bold text-gray-900 md:block dark:text-white">
            پنل پرو
          </span>
        </Link>

        {/* ناوبری افقی (دسکتاپ) */}
        <nav className="mr-4 hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* اکشن‌ها */}
        <div className="flex items-center gap-1.5">
          {/* سرچ */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <HiOutlineSearch className="h-4 w-4 text-gray-400" />
            </div>
            <TextInput
              id="search"
              type="text"
              placeholder="جستجو..."
              sizing="sm"
              className="w-48 [&_input]:pr-9 xl:w-64"
            />
          </div>

          {/* اعلان‌ها */}
          <button
            className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="اعلان‌ها"
          >
            <HiOutlineBell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
          </button>

          {/* دارک مود */}
          <DarkThemeToggle className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" />

          {/* پروفایل */}
          <Dropdown
            inline
            label={
              <Avatar
                placeholderInitials="عر"
                rounded
                size="sm"
                className="cursor-pointer"
              />
            }
            arrowIcon={false}
          >
            <DropdownHeader>
              <span className="block text-sm font-semibold">علی رضایی</span>
              <span className="block truncate text-xs text-gray-500">
                ali@example.com
              </span>
            </DropdownHeader>
            <DropdownItem icon={HiOutlineUser}>پروفایل من</DropdownItem>
            <DropdownItem icon={HiOutlineCog}>تنظیمات</DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={HiOutlineLogout} className="text-red-600">
              خروج از حساب
            </DropdownItem>
          </Dropdown>

          {/* دکمه منوی موبایل */}
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 xl:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="ناوبری"
          >
            {mobileNavOpen ? (
              <HiX className="h-5 w-5" />
            ) : (
              <HiOutlineMenuAlt2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ناوبری موبایل/تبلت */}
      {mobileNavOpen && (
        <nav className="flex flex-col gap-1 border-t border-gray-200 px-4 py-3 xl:hidden dark:border-gray-800">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}