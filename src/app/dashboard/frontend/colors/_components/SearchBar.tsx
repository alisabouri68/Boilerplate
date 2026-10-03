"use client";

import { useUI } from "@/lib/design-system/colors-hooks";

export default function SearchBar() {
  const { search, setSearch, filter, setFilter, sort, setSort } = useUI();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در نام، توکن، hex…"
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 ps-9 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        <span className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as any)}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
      >
        <option value="all">همه</option>
        <option value="active">فعال</option>
        <option value="inactive">غیرفعال</option>
        <option value="pinned">پین‌شده</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as any)}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
      >
        <option value="manual">دستی</option>
        <option value="name-asc">نام ↑</option>
        <option value="name-desc">نام ↓</option>
        <option value="shades-desc">بیشترین سایه</option>
      </select>
    </div>
  );
}