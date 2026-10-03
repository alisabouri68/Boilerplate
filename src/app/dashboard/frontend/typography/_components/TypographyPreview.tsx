"use client";

import { useTypography } from "@/lib/design-system/typography-hooks";
import { resolveTextStyle } from "@/lib/design-system/typography-utils";

export default function TypographyPreview() {
  const system = useTypography();

  const get = (name: string) => {
    const s = system.textStyles.find((x) => x.name === name);
    if (!s) return null;
    const r = resolveTextStyle(s, system);
    if (!r) return null;
    return {
      style: {
        fontSize: `${r.fontSize}px`,
        fontWeight: r.fontWeight,
        lineHeight: r.lineHeight,
        letterSpacing: r.letterSpacing,
        fontFamily: r.fontFamily,
      } as React.CSSProperties,
      label: `${r.fontSize}px · w${r.fontWeight} · lh${r.lineHeight}`,
    };
  };

  const styles = ["display", "h1", "h2", "h3", "body-lg", "body", "body-sm", "caption"]
    .map((name) => ({ name, resolved: get(name) }))
    .filter((x) => x.resolved);

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
        پیش‌نمایش
      </h3>

      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {styles.map(({ name, resolved }) => (
          <div key={name}>
            <div className="mb-1 flex items-center justify-between">
              <code className="font-mono text-[10px] text-gray-500 dark:text-gray-400">
                {name}
              </code>
              <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">
                {resolved!.label}
              </span>
            </div>
            <p
              className="text-gray-900 dark:text-white"
              style={resolved!.style}
              dir="rtl"
            >
              {name === "display" && "طراحی، ساده‌تر از آنچه فکر می‌کنی."}
              {name === "h1" && "عنوان اصلی صفحه"}
              {name === "h2" && "عنوان بخش"}
              {name === "h3" && "عنوان فرعی"}
              {name === "body-lg" &&
                "این یک پاراگراف با اندازه بزرگ است که برای مقدمه یا متن‌های تأکیدی استفاده می‌شود."}
              {name === "body" &&
                "این متن پیش‌فرض بدنه است. برای بیشتر محتوای صفحه از همین استایل استفاده می‌شود."}
              {name === "body-sm" &&
                "متن کوچک برای توضیحات فرعی و راهنماها."}
              {name === "caption" && "برچسب یا کپشن"}
            </p>
          </div>
        ))}

        {/* اعداد جدولی */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <code className="font-mono text-[10px] text-gray-500 dark:text-gray-400">
              tabular-nums
            </code>
            <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">
              برای جدول‌ها
            </span>
          </div>
          <table className="w-full text-xs" style={{ fontVariantNumeric: "tabular-nums" }}>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="py-1">کاربر ۱</td>
                <td className="py-1 text-end">۱٬۲۴۰</td>
                <td className="py-1 text-end font-mono">12,340</td>
              </tr>
              <tr>
                <td className="py-1">کاربر ۲</td>
                <td className="py-1 text-end">۸۹۰</td>
                <td className="py-1 text-end font-mono">890</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}