"use client";

import { useMemo } from "react";
import { useThemeStore, selectActiveTheme } from "@/lib/design-system/theme-store";
import { useColorsStore } from "@/lib/design-system/colors-store";
import { resolveTheme } from "@/lib/design-system/theme";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiXCircle,
  HiInformationCircle,
  HiSearch,
  HiBell,
  HiUser,
  HiChevronDown,
} from "react-icons/hi";

type Props = {
  /** اگر ندهی، تم فعال پروژه پیش‌نمایش داده می‌شود */
  themeId?: string;
};

export default function ThemeLivePreview({ themeId }: Props = {}) {
  const activeTheme = useThemeStore(selectActiveTheme);
  const themeFromId = useThemeStore((s) =>
    themeId ? s.themes.find((t) => t.id === themeId) : undefined
  );
  const palettes = useColorsStore((s) => s.palettes);

  const theme = themeFromId ?? activeTheme;

  const resolved = useMemo(
    () => (theme ? resolveTheme(theme, palettes) : null),
    [theme, palettes]
  );

  if (!theme || !resolved) return null;

  const v = resolved.values;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          پیش‌نمایش زنده
        </h3>
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          {theme.emoji} {theme.name}
        </span>
      </div>

      {/* بوم پیش‌نمایش — با inline style، مستقل از تم فعال اپ */}
      <div
        className="space-y-4 rounded-2xl border p-5"
        style={{
          background: v["bg-base"],
          borderColor: v["border-default"],
        }}
      >
        {/* پس‌زمینه پایه */}
        <div
          className="space-y-4 rounded-xl p-4"
          style={{ background: v["bg-base"] }}
        >
          {/* ---------------- هدر نمونه ---------------- */}
          <div
            className="flex items-center justify-between rounded-lg border px-3 py-2"
            style={{
              background: v["bg-surface"],
              borderColor: v["border-default"],
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold"
                style={{
                  background: v["primary"],
                  color: v["text-inverse"],
                }}
              >
                م
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: v["text-primary"] }}
              >
                پنل مدیریت
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-md p-1.5"
                style={{ color: v["text-secondary"] }}
              >
                <HiBell className="h-3.5 w-3.5" />
              </button>
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{
                  background: v["bg-subtle"],
                  color: v["text-secondary"],
                }}
              >
                <HiUser className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* ---------------- کارت + تیتر + متن ---------------- */}
          <div
            className="rounded-xl border p-4"
            style={{
              background: v["bg-surface"],
              borderColor: v["border-default"],
            }}
          >
            <h4
              className="text-sm font-bold"
              style={{ color: v["text-primary"] }}
            >
              گزارش هفتگی
            </h4>
            <p
              className="mt-1 text-[11px] leading-relaxed"
              style={{ color: v["text-secondary"] }}
            >
              خلاصه عملکرد شما در هفت روز گذشته. برای جزئیات بیشتر روی دکمه
              زیر بزنید.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-lg px-3 py-1.5 text-[11px] font-semibold transition"
                style={{
                  background: v["primary"],
                  color: v["text-inverse"],
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = v["primary-hover"])
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = v["primary"])
                }
              >
                مشاهده گزارش
              </button>
              <button
                type="button"
                className="rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition"
                style={{
                  background: "transparent",
                  borderColor: v["border-default"],
                  color: v["text-primary"],
                }}
              >
                انصراف
              </button>
              <button
                type="button"
                disabled
                className="rounded-lg px-3 py-1.5 text-[11px] font-semibold"
                style={{
                  background: v["primary-disabled"],
                  color: v["text-tertiary"],
                  cursor: "not-allowed",
                }}
              >
                غیرفعال
              </button>
            </div>
          </div>

          {/* ---------------- فرم ---------------- */}
          <div
            className="space-y-3 rounded-xl border p-4"
            style={{
              background: v["bg-surface"],
              borderColor: v["border-default"],
            }}
          >
            <label
              className="block text-[11px] font-medium"
              style={{ color: v["text-secondary"] }}
            >
              جستجو
            </label>
            <div
              className="flex items-center gap-2 rounded-lg border px-2 py-1.5"
              style={{
                background: v["bg-base"],
                borderColor: v["border-default"],
              }}
            >
              <HiSearch
                className="h-3.5 w-3.5"
                style={{ color: v["text-tertiary"] }}
              />
              <input
                placeholder="چیزی بنویس..."
                className="w-full bg-transparent text-xs outline-none"
                style={{ color: v["text-primary"] }}
              />
            </div>

            {/* select نمونه */}
            <div
              className="flex items-center justify-between rounded-lg border px-2 py-1.5 text-xs"
              style={{
                background: v["bg-base"],
                borderColor: v["border-default"],
                color: v["text-primary"],
              }}
            >
              <span>همه وضعیت‌ها</span>
              <HiChevronDown
                className="h-3.5 w-3.5"
                style={{ color: v["text-tertiary"] }}
              />
            </div>
          </div>

          {/* ---------------- آلرت‌ها ---------------- */}
          <div className="space-y-2">
            <Alert
              icon={<HiCheckCircle className="h-4 w-4" />}
              title="ذخیره شد"
              text="تغییرات شما با موفقیت ذخیره شد."
              color={v["success"]}
              bg={v["success-bg"]}
              border={v["success-border"]}
              textPrimary={v["text-primary"]}
              textSecondary={v["text-secondary"]}
            />
            <Alert
              icon={<HiExclamationCircle className="h-4 w-4" />}
              title="هشدار"
              text="اتصال اینترنت ناپایدار است."
              color={v["warning"]}
              bg={v["warning-bg"]}
              border={v["warning-border"]}
              textPrimary={v["text-primary"]}
              textSecondary={v["text-secondary"]}
            />
            <Alert
              icon={<HiXCircle className="h-4 w-4" />}
              title="خطا"
              text="پرداخت انجام نشد."
              color={v["danger"]}
              bg={v["danger-bg"]}
              border={v["danger-border"]}
              textPrimary={v["text-primary"]}
              textSecondary={v["text-secondary"]}
            />
            <Alert
              icon={<HiInformationCircle className="h-4 w-4" />}
              title="اطلاع"
              text="نسخه جدید در دسترس است."
              color={v["info"]}
              bg={v["info-bg"]}
              border={v["info-border"]}
              textPrimary={v["text-primary"]}
              textSecondary={v["text-secondary"]}
            />
          </div>

          {/* ---------------- بج‌ها ---------------- */}
          <div
            className="rounded-xl border p-4"
            style={{
              background: v["bg-surface"],
              borderColor: v["border-default"],
            }}
          >
            <p
              className="mb-2 text-[11px] font-medium"
              style={{ color: v["text-secondary"] }}
            >
              نشان‌ها
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge color={v["primary"]} bg={v["primary"] + "22"}>
                اصلی
              </Badge>
              <Badge color={v["success"]} bg={v["success-bg"]}>
                موفق
              </Badge>
              <Badge color={v["warning"]} bg={v["warning-bg"]}>
                هشدار
              </Badge>
              <Badge color={v["danger"]} bg={v["danger-bg"]}>
                خطا
              </Badge>
              <Badge color={v["info"]} bg={v["info-bg"]}>
                اطلاع
              </Badge>
            </div>
          </div>

          {/* ---------------- جدول نمونه ---------------- */}
          <div
            className="overflow-hidden rounded-xl border"
            style={{
              background: v["bg-surface"],
              borderColor: v["border-default"],
            }}
          >
            <table className="w-full text-[11px]">
              <thead>
                <tr
                  style={{
                    background: v["bg-subtle"],
                    color: v["text-secondary"],
                  }}
                >
                  <th className="px-3 py-2 text-right font-medium">نام</th>
                  <th className="px-3 py-2 text-right font-medium">وضعیت</th>
                  <th className="px-3 py-2 text-right font-medium">مقدار</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "کاربر ۱", status: "فعال", val: "۱٬۲۴۰" },
                  { name: "کاربر ۲", status: "در انتظار", val: "۸۹۰" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? v["bg-surface"] : v["bg-subtle"],
                      borderTop: `1px solid ${v["border-subtle"]}`,
                      color: v["text-primary"],
                    }}
                  >
                    <td className="px-3 py-1.5">{row.name}</td>
                    <td className="px-3 py-1.5">{row.status}</td>
                    <td
                      className="px-3 py-1.5 font-mono tabular-nums"
                      style={{ color: v["text-secondary"] }}
                    >
                      {row.val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- زیرکامپوننت‌ها ---------------- */

function Alert({
  icon,
  title,
  text,
  color,
  bg,
  border,
  textPrimary,
  textSecondary,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  color: string;
  bg: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
}) {
  return (
    <div
      className="flex items-start gap-2 rounded-lg border p-2.5"
      style={{ background: bg, borderColor: border }}
    >
      <span style={{ color }} className="mt-0.5 shrink-0">
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-bold" style={{ color: textPrimary }}>
          {title}
        </p>
        <p className="mt-0.5 text-[10px]" style={{ color: textSecondary }}>
          {text}
        </p>
      </div>
    </div>
  );
}

function Badge({
  children,
  color,
  bg,
}: {
  children: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}