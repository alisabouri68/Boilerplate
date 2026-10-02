import {
  Badge,
  Card,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineTrendingUp,
  HiArrowUp,
  HiArrowDown,
} from "react-icons/hi";

/* ---------- داده‌های نمونه ---------- */
const stats = [
  {
    title: "درآمد کل",
    value: "۸۴,۲۵۰,۰۰۰",
    unit: "تومان",
    change: 12.5,
    trend: "up",
    icon: HiOutlineCurrencyDollar,
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    title: "سفارش‌ها",
    value: "۱,۲۴۸",
    unit: "سفارش",
    change: 8.2,
    trend: "up",
    icon: HiOutlineShoppingCart,
    iconBg:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  {
    title: "مشتریان فعال",
    value: "۳,۶۹۲",
    unit: "نفر",
    change: -2.4,
    trend: "down",
    icon: HiOutlineUsers,
    iconBg:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
  },
  {
    title: "نرخ تبدیل",
    value: "۴.۸",
    unit: "درصد",
    change: 3.1,
    trend: "up",
    icon: HiOutlineTrendingUp,
    iconBg:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  },
];

const chartData = [
  { month: "فرو", value: 42 },
  { month: "ارد", value: 58 },
  { month: "خرد", value: 35 },
  { month: "تیر", value: 72 },
  { month: "مرد", value: 88 },
  { month: "شهر", value: 64 },
  { month: "مهر", value: 92 },
  { month: "آبا", value: 76 },
  { month: "آذر", value: 55 },
  { month: "دی", value: 81 },
  { month: "بهم", value: 69 },
  { month: "اسف", value: 95 },
];

const orders = [
  {
    id: "#ORD-1042",
    customer: "علی رضایی",
    date: "۱۴۰۳/۰۵/۱۲",
    amount: "۲,۴۵۰,۰۰۰",
    status: "تکمیل شده",
    color: "success",
  },
  {
    id: "#ORD-1041",
    customer: "مریم احمدی",
    date: "۱۴۰۳/۰۵/۱۲",
    amount: "۱,۲۰۰,۰۰۰",
    status: "در حال ارسال",
    color: "info",
  },
  {
    id: "#ORD-1040",
    customer: "رضا کریمی",
    date: "۱۴۰۳/۰۵/۱۱",
    amount: "۸۹۰,۰۰۰",
    status: "در انتظار",
    color: "warning",
  },
  {
    id: "#ORD-1039",
    customer: "سارا نوری",
    date: "۱۴۰۳/۰۵/۱۱",
    amount: "۴,۱۰۰,۰۰۰",
    status: "تکمیل شده",
    color: "success",
  },
  {
    id: "#ORD-1038",
    customer: "حسین مرادی",
    date: "۱۴۰۳/۰۵/۱۰",
    amount: "۵۶۰,۰۰۰",
    status: "لغو شده",
    color: "failure",
  },
] as const;

const goals = [
  { label: "هدف فروش", value: 82, color: "blue" },
  { label: "رضایت مشتری", value: 94, color: "green" },
  { label: "بازگشت مشتری", value: 67, color: "purple" },
] as const;

/* ---------- کامپوننت ---------- */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            داشبورد
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            خلاصه‌ای از عملکرد امروز مجموعه شما
          </p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          آخرین به‌روزرسانی: چند لحظه پیش
        </div>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const isUp = s.trend === "up";
          return (
            <Card key={s.title} className="border-gray-200 dark:border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {s.title}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {s.value}
                    </span>
                    <span className="text-xs text-gray-400">{s.unit}</span>
                  </div>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                    isUp
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {isUp ? (
                    <HiArrowUp className="h-3 w-3" />
                  ) : (
                    <HiArrowDown className="h-3 w-3" />
                  )}
                  {Math.abs(s.change)}%
                </span>
                <span className="text-gray-400">نسبت به ماه قبل</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* نمودار + اهداف */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* نمودار فروش */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                فروش ماهانه
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                میلیون تومان
              </p>
            </div>
            <Badge color="info">سال ۱۴۰۳</Badge>
          </div>

          <div className="flex h-56 items-end justify-between gap-1.5">
            {chartData.map((d) => (
              <div
                key={d.month}
                className="group flex flex-1 flex-col items-center gap-2"
              >
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-indigo-500 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-400"
                    style={{ height: `${d.value}%` }}
                  />
                  <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                    {d.value}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  {d.month}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* اهداف */}
        <Card>
          <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
            اهداف کلیدی
          </h2>
          <div className="space-y-5">
            {goals.map((g) => (
              <div key={g.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {g.label}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {g.value}%
                  </span>
                </div>
                <Progress
                  progress={g.value}
                  color={g.color}
                  size="sm"
                  className="[&>div]:rounded-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-800/50 dark:to-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              عملکرد کلی تیم
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              عالی ✨
            </p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              ۸۱٪ از اهداف این ماه محقق شده.
            </p>
          </div>
        </Card>
      </div>

      {/* جدول سفارش‌های اخیر */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              سفارش‌های اخیر
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ۵ سفارش آخر ثبت‌شده
            </p>
          </div>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            مشاهده همه
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>شماره سفارش</TableHeadCell>
                <TableHeadCell>مشتری</TableHeadCell>
                <TableHeadCell>تاریخ</TableHeadCell>
                <TableHeadCell>مبلغ (تومان)</TableHeadCell>
                <TableHeadCell>وضعیت</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {orders.map((o) => (
                <TableRow
                  key={o.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {o.id}
                  </TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell className="text-gray-500 dark:text-gray-400">
                    {o.date}
                  </TableCell>
                  <TableCell className="font-semibold">{o.amount}</TableCell>
                  <TableCell>
                    <Badge color={o.color} className="w-fit">
                      {o.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}