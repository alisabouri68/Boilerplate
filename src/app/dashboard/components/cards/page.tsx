import { Card, Button, Badge, Progress } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";

export default function CardsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">کارت ساده</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                کارت شماره {i}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                توضیح کوتاه درباره محتوای این کارت.
              </p>
              <Button color="blue" size="sm">
                مشاهده
                <HiArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">کارت آماری</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { label: "کاربران", value: "۱,۲۴۸", change: "+۱۲٪", color: "text-emerald-500" },
            { label: "فروش", value: "۸۴M", change: "+۸٪", color: "text-emerald-500" },
            { label: "بازدید", value: "۳.۲K", change: "-۲٪", color: "text-red-500" },
            { label: "تبدیل", value: "۴.۸٪", change: "+۳٪", color: "text-emerald-500" },
          ].map((s) => (
            <Card key={s.label}>
              <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</span>
                <span className={`text-xs font-semibold ${s.color}`}>{s.change}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">کارت محصول</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {["هدفون", "ساعت هوشمند", "کیف چرمی"].map((p) => (
            <Card key={p} className="overflow-hidden p-0">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl">
                🎁
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white">{p}</h3>
                  <Badge color="success">جدید</Badge>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  توضیح کوتاه محصول با ویژگی‌های اصلی
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ۲,۴۵۰,۰۰۰
                  </span>
                  <Button size="sm" color="blue">افزودن</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">کارت با Progress</h2>
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">پیشرفت پروژه</span>
            <span className="text-xs text-gray-500">۸۲٪</span>
          </div>
          <Progress progress={82} color="blue" className="mt-2" />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            ۹ از ۱۱ تسک تکمیل شده
          </p>
        </Card>
      </section>
    </div>
  );
}