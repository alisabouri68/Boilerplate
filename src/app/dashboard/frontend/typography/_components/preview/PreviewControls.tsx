"use client";

import {
  HiOutlineDesktopComputer,
  HiOutlineDeviceMobile,
  HiOutlineDeviceTablet,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from "react-icons/hi";

export type PreviewConfig = {
  sample: "article" | "landing" | "form" | "table" | "mixed";
  theme: "light" | "dark";
  direction: "rtl" | "ltr";
  density: "compact" | "comfortable" | "spacious";
  width: "auto" | "mobile" | "tablet";
  showGuides: boolean;
  showLabels: boolean;
};

const SAMPLE_OPTIONS: { id: PreviewConfig["sample"]; label: string }[] = [
  { id: "article", label: "مقاله" },
  { id: "landing", label: "لندینگ" },
  { id: "form", label: "فرم" },
  { id: "table", label: "جدول" },
  { id: "mixed", label: "ترکیبی" },
];

const DENSITY_OPTIONS: { id: PreviewConfig["density"]; label: string }[] = [
  { id: "compact", label: "فشرده" },
  { id: "comfortable", label: "معمولی" },
  { id: "spacious", label: "باز" },
];

export default function PreviewControls({
  config,
  onChange,
}: {
  config: PreviewConfig;
  onChange: (next: PreviewConfig) => void;
}) {
  const set = <K extends keyof PreviewConfig>(key: K, value: PreviewConfig[K]) =>
    onChange({ ...config, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50/60 p-2 dark:border-gray-800 dark:bg-gray-900/50">
      {/* Sample selector */}
      <div className="flex gap-0.5 rounded-lg bg-white p-0.5 dark:bg-gray-950">
        {SAMPLE_OPTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => set("sample", s.id)}
            className={`rounded-md px-2 py-1 text-[10px] font-medium transition ${
              config.sample === s.id
                ? "bg-gray-900 text-white dark:bg-gray-700"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Density */}
      <div className="flex gap-0.5 rounded-lg bg-white p-0.5 dark:bg-gray-950">
        {DENSITY_OPTIONS.map((d) => (
          <button
            key={d.id}
            onClick={() => set("density", d.id)}
            className={`rounded-md px-2 py-1 text-[10px] font-medium transition ${
              config.density === d.id
                ? "bg-gray-900 text-white dark:bg-gray-700"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Width */}
      <div className="flex gap-0.5 rounded-lg bg-white p-0.5 dark:bg-gray-950">
        <IconBtn
          active={config.width === "auto"}
          onClick={() => set("width", "auto")}
          title="تمام عرض"
        >
          <HiOutlineDesktopComputer className="h-3.5 w-3.5" />
        </IconBtn>
        <IconBtn
          active={config.width === "tablet"}
          onClick={() => set("width", "tablet")}
          title="تبلت"
        >
          <HiOutlineDeviceTablet className="h-3.5 w-3.5" />
        </IconBtn>
        <IconBtn
          active={config.width === "mobile"}
          onClick={() => set("width", "mobile")}
          title="موبایل"
        >
          <HiOutlineDeviceMobile className="h-3.5 w-3.5" />
        </IconBtn>
      </div>

      <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Theme + Direction */}
      <div className="flex gap-0.5 rounded-lg bg-white p-0.5 dark:bg-gray-950">
        <IconBtn
          active={config.theme === "light"}
          onClick={() => set("theme", "light")}
          title="روشن"
        >
          <HiOutlineSun className="h-3.5 w-3.5" />
        </IconBtn>
        <IconBtn
          active={config.theme === "dark"}
          onClick={() => set("theme", "dark")}
          title="تیره"
        >
          <HiOutlineMoon className="h-3.5 w-3.5" />
        </IconBtn>
      </div>

      <button
        onClick={() =>
          set("direction", config.direction === "rtl" ? "ltr" : "rtl")
        }
        className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-gray-600 dark:bg-gray-950 dark:text-gray-300"
        title="تغییر جهت"
      >
        {config.direction === "rtl" ? "RTL" : "LTR"}
      </button>

      <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Toggles */}
      <IconBtn
        active={config.showLabels}
        onClick={() => set("showLabels", !config.showLabels)}
        title="نمایش برچسب‌ها"
      >
        <HiOutlineViewList className="h-3.5 w-3.5" />
      </IconBtn>
      <IconBtn
        active={config.showGuides}
        onClick={() => set("showGuides", !config.showGuides)}
        title="خطوط راهنما"
      >
        <HiOutlineViewGrid className="h-3.5 w-3.5" />
      </IconBtn>
    </div>
  );
}

function IconBtn({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded-md p-1 transition ${
        active
          ? "bg-gray-900 text-white dark:bg-gray-700"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      }`}
    >
      {children}
    </button>
  );
}