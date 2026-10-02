"use client";

import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { HiCog, HiUser, HiLogout, HiChevronDown } from "react-icons/hi";

export default function DropdownsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Dropdown پایه</h2>
        <Dropdown label="منوی من" dismissOnClick={false}>
          <DropdownItem icon={HiUser}>پروفایل</DropdownItem>
          <DropdownItem icon={HiCog}>تنظیمات</DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={HiLogout} className="text-red-600">
            خروج
          </DropdownItem>
        </Dropdown>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">با هدر</h2>
        <Dropdown
          label="حساب کاربری"
          renderTrigger={() => (
            <Button color="light">
              حساب کاربری
              <HiChevronDown className="mr-2 h-4 w-4" />
            </Button>
          )}
        >
          <DropdownHeader>
            <span className="block text-sm font-semibold">علی رضایی</span>
            <span className="block text-xs text-gray-500">ali@example.com</span>
          </DropdownHeader>
          <DropdownItem>داشبورد</DropdownItem>
          <DropdownItem>تنظیمات</DropdownItem>
          <DropdownDivider />
          <DropdownItem>خروج</DropdownItem>
        </Dropdown>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">موقعیت‌ها</h2>
        <div className="flex flex-wrap gap-3">
          {(["top", "right", "bottom", "left"] as const).map((pos) => (
            <Dropdown key={pos} label={`موقعیت ${pos}`} placement={pos}>
              <DropdownItem>مورد ۱</DropdownItem>
              <DropdownItem>مورد ۲</DropdownItem>
              <DropdownItem>مورد ۳</DropdownItem>
            </Dropdown>
          ))}
        </div>
      </section>
    </div>
  );
}