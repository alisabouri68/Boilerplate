"use client";

import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "@/lib/design-system/theme-store";
import { HiPencil, HiCheck, HiX, HiLockClosed } from "react-icons/hi";

export default function EditableThemeName({
  themeId,
  name,
  builtin,
}: {
  themeId: string;
  name: string;
  builtin?: boolean;
}) {
  const renameTheme = useThemeStore((s) => s.renameTheme);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(name);
  }, [name]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const commit = () => {
    const ok = renameTheme(themeId, draft);
    if (ok) setEditing(false);
    else setDraft(name); // اگر رد شد، برگردان
  };

  const cancel = () => {
    setDraft(name);
    setEditing(false);
  };

  // تم پیش‌فرض: فقط نمایشی
  if (builtin) {
    return (
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold text-gray-900 dark:text-white">
          {name}
        </h1>
        <span
          className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          title="نام تم‌های پیش‌فرض قابل تغییر نیست"
        >
          <HiLockClosed className="h-3 w-3" />
          قفل
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") cancel();
            }}
            className="w-48 rounded-lg border border-blue-400 bg-white px-2 py-1 text-base font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-blue-600 dark:bg-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={commit}
            className="rounded-lg bg-green-600 p-1.5 text-white hover:bg-green-700"
            title="ذخیره"
          >
            <HiCheck className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={cancel}
            className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
            title="انصراف"
          >
            <HiX className="h-3.5 w-3.5" />
          </button>
        </>
      ) : (
        <>
          <h1
            onDoubleClick={() => setEditing(true)}
            className="text-base font-bold text-gray-900 dark:text-white"
            title="برای ویرایش دوبار کلیک کن"
          >
            {name}
          </h1>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            title="تغییر نام"
          >
            <HiPencil className="h-3.5 w-3.5" />
          </button>
        </>
      )}
    </div>
  );
}