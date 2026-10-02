import { Button } from "flowbite-react";
import { HiPlus, HiTrash, HiDownload } from "react-icons/hi";

export default function ButtonsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">رنگ‌ها</h2>
        <div className="flex flex-wrap gap-3">
          {(["blue", "gray", "green", "red", "yellow", "purple", "pink", "indigo", "cyan", "success", "failure", "warning"] as const).map((c) => (
            <Button key={c} color={c}>{c}</Button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">سایزها</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">با آیکون</h2>
        <div className="flex flex-wrap gap-3">
          <Button color="blue"><HiPlus className="mr-2 h-4 w-4" />افزودن</Button>
          <Button color="red"><HiTrash className="mr-2 h-4 w-4" />حذف</Button>
          <Button color="green"><HiDownload className="mr-2 h-4 w-4" />دانلود</Button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">حالت‌ها</h2>
        <div className="flex flex-wrap gap-3">
          <Button>عادی</Button>
          <Button disabled>غیرفعال</Button>
          <Button isProcessing>در حال پردازش</Button>
          <Button pill>گرد</Button>
          <Button outline>Outline</Button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">گروه دکمه</h2>
        <Button.Group>
          <Button color="gray">پروفایل</Button>
          <Button color="gray">تنظیمات</Button>
          <Button color="gray">خروج</Button>
        </Button.Group>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">دکمه سفارشی Tailwind</h2>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-gradient-to-l from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700">
            گرادیان
          </button>
          <button className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
            موفقیت
          </button>
          <button className="rounded-lg border-2 border-blue-500 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20">
            Outline سفارشی
          </button>
        </div>
      </section>
    </div>
  );
}