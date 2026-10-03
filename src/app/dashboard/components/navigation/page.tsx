"use client";

import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, Pagination, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export default function NavigationPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Breadcrumb</h2>
        <Breadcrumb aria-label="مسیر">
          <BreadcrumbItem href="/">خانه</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard">داشبورد</BreadcrumbItem>
          <BreadcrumbItem>کامپوننت‌ها</BreadcrumbItem>
        </Breadcrumb>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Pagination</h2>
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="bg-white p-4 text-base font-bold text-gray-900 dark:bg-gray-900 dark:text-white">
          Navbar
        </h2>
        <Navbar fluid rounded>
          <NavbarBrand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              پنل پرو
            </span>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink href="/" active>خانه</NavbarLink>
            <NavbarLink href="/dashboard">داشبورد</NavbarLink>
            <NavbarLink href="/dashboard/components">کامپوننت‌ها</NavbarLink>
            <NavbarLink href="/dashboard/docs">مستندات</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Pagination سفارشی</h2>
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Link
              key={n}
              href="#"
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                n === 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}