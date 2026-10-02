"use client";

import { useState } from "react";

const durations = [
  { name: "duration-75", value: "75ms", use: "میکرو تعامل‌ها" },
  { name: "duration-150", value: "150ms", use: "hover دکمه‌ها" },
  { name: "duration-200", value: "200ms", use: "پیش‌فرض UI" },
  { name: "duration-300", value: "300ms", use: "Dropdown، Tooltip" },
  { name: "duration-500", value: "500ms", use: "Modal، Drawer" },
  { name: "duration-700", value: "700ms", use: "انیمیشن‌های بزرگ" },
];

const easings = [
  { name: "ease-linear", cls: "ease-linear", desc: "خطی - برای progress" },
  { name: "ease-in", cls: "ease-in", desc: "شروع آرام - خروج" },
  { name: "ease-out", cls: "ease-out", desc: "پایان آرام - ورود" },
  { name: "ease-in-out", cls: "ease-in-out", desc: "نرم - عمومی" },
];

export default function MotionPage() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          مدت انیمیشن (Duration)
        </h2>
        <div className="space-y-2">
          {durations.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="w-32 shrink-0 font-mono text-xs text-blue-600 dark:text-blue-400">
                {d.name}
              </span>
              <span className="w-20 shrink-0 font-mono text-xs text-gray-500 dark:text-gray-400">
                {d.value}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {d.use}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          منحنی حرکت (Easing)
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {easings.map((e) => (
            <div
              key={e.name}
              className="group rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400">
                {e.name}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {e.desc}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={`h-full w-1/3 rounded-full bg-gradient-to-l from-blue-500 to-indigo-500 transition-all duration-700 ${e.cls} group-hover:w-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            نمونه‌های زنده
          </h2>
          <button
            onClick={() => setPlaying((v) => !v)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            {playing ? "توقف" : "اجرا"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { name: "Fade", cls: playing ? "opacity-100" : "opacity-20" },
            { name: "Scale", cls: playing ? "scale-100" : "scale-50" },
            { name: "Translate", cls: playing ? "translate-x-0" : "translate-x-12" },
            { name: "Rotate", cls: playing ? "rotate-0" : "rotate-45" },
            { name: "Blur", cls: playing ? "blur-0" : "blur-md" },
            { name: "Combined", cls: playing ? "opacity-100 scale-100" : "opacity-20 scale-50" },
          ].map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-24 items-center justify-center">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-lg transition-all duration-500 ease-out ${a.cls}`}
                >
                  {a.name.slice(0, 3)}
                </div>
              </div>
              <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                {a.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          انیمیشن‌های آماده Tailwind
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "animate-spin", cls: "animate-spin" },
            { name: "animate-ping", cls: "animate-ping" },
            { name: "animate-pulse", cls: "animate-pulse" },
            { name: "animate-bounce", cls: "animate-bounce" },
          ].map((a) => (
            <div
              key={a.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 ${a.cls}`}
                />
              </div>
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                {a.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}