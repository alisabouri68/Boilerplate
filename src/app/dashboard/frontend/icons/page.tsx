import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCloud,
  HiOutlineDownload,
  HiOutlineUpload,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi";

const iconGroups = [
  {
    title: "ناوبری",
    icons: [
      { icon: HiOutlineHome, name: "Home" },
      { icon: HiOutlineChevronLeft, name: "ChevronLeft" },
      { icon: HiOutlineChevronRight, name: "ChevronRight" },
      { icon: HiOutlineChevronUp, name: "ChevronUp" },
      { icon: HiOutlineChevronDown, name: "ChevronDown" },
    ],
  },
  {
    title: "اکشن‌ها",
    icons: [
      { icon: HiOutlinePlus, name: "Plus" },
      { icon: HiOutlineMinus, name: "Minus" },
      { icon: HiOutlineCheck, name: "Check" },
      { icon: HiOutlineX, name: "X" },
      { icon: HiOutlinePencil, name: "Pencil" },
      { icon: HiOutlineTrash, name: "Trash" },
      { icon: HiOutlineDownload, name: "Download" },
      { icon: HiOutlineUpload, name: "Upload" },
    ],
  },
  {
    title: "کاربر",
    icons: [
      { icon: HiOutlineUser, name: "User" },
      { icon: HiOutlineMail, name: "Mail" },
      { icon: HiOutlinePhone, name: "Phone" },
      { icon: HiOutlineHeart, name: "Heart" },
      { icon: HiOutlineStar, name: "Star" },
      { icon: HiOutlineBell, name: "Bell" },
    ],
  },
  {
    title: "عمومی",
    icons: [
      { icon: HiOutlineCog, name: "Cog" },
      { icon: HiOutlineSearch, name: "Search" },
      { icon: HiOutlineCalendar, name: "Calendar" },
      { icon: HiOutlineClock, name: "Clock" },
      { icon: HiOutlineCloud, name: "Cloud" },
    ],
  },
];

const sizes = [
  { name: "h-4 w-4", cls: "h-4 w-4", label: "16px" },
  { name: "h-5 w-5", cls: "h-5 w-5", label: "20px" },
  { name: "h-6 w-6", cls: "h-6 w-6", label: "24px" },
  { name: "h-8 w-8", cls: "h-8 w-8", label: "32px" },
  { name: "h-10 w-10", cls: "h-10 w-10", label: "40px" },
];

export default function IconsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        <strong>کتابخانه:</strong> از{" "}
        <span className="font-mono">react-icons/hi</span> (Heroicons Outline)
        استفاده می‌کنیم. برای آیکون‌های پر از{" "}
        <span className="font-mono">react-icons/hi2</span>.
      </section>

      {iconGroups.map((g) => (
        <section key={g.title}>
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            {g.title}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {g.icons.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
                >
                  <Icon className="h-6 w-6 text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                  <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          اندازه‌های استاندارد
        </h2>
        <div className="flex flex-wrap items-end gap-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          {sizes.map((s) => (
            <div key={s.name} className="text-center">
              <HiOutlineHome
                className={`${s.cls} mx-auto text-blue-600 dark:text-blue-400`}
              />
              <div className="mt-2 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                {s.name}
              </div>
              <div className="text-[10px] text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          رنگ‌های آیکون
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { cls: "text-gray-600", name: "Neutral" },
            { cls: "text-blue-600", name: "Primary" },
            { cls: "text-emerald-600", name: "Success" },
            { cls: "text-amber-500", name: "Warning" },
            { cls: "text-red-600", name: "Danger" },
          ].map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-gray-900"
            >
              <HiOutlineBell className={`h-6 w-6 ${c.cls}`} />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه استفاده در دکمه
        </h2>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
            <HiOutlinePlus className="h-4 w-4" />
            افزودن
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            <HiOutlineDownload className="h-4 w-4" />
            دانلود
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
            <HiOutlineTrash className="h-4 w-4" />
            حذف
          </button>
        </div>
      </section>
    </div>
  );
}