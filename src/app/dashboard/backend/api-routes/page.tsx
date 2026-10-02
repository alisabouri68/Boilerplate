const endpoints = [
  {
    method: "GET",
    path: "/api/users",
    desc: "دریافت لیست کاربران",
    auth: "نیاز به احراز هویت",
    color: "bg-blue-600",
  },
  {
    method: "GET",
    path: "/api/users/[id]",
    desc: "دریافت یک کاربر",
    auth: "نیاز به احراز هویت",
    color: "bg-blue-600",
  },
  {
    method: "POST",
    path: "/api/users",
    desc: "ایجاد کاربر جدید",
    auth: "نیاز به احراز هویت + Admin",
    color: "bg-emerald-600",
  },
  {
    method: "PATCH",
    path: "/api/users/[id]",
    desc: "به‌روزرسانی کاربر",
    auth: "نیاز به احراز هویت",
    color: "bg-amber-500",
  },
  {
    method: "DELETE",
    path: "/api/users/[id]",
    desc: "حذف کاربر",
    auth: "نیاز به احراز هویت + Admin",
    color: "bg-red-600",
  },
  {
    method: "POST",
    path: "/api/auth/login",
    desc: "ورود کاربر",
    auth: "عمومی",
    color: "bg-emerald-600",
  },
  {
    method: "POST",
    path: "/api/auth/logout",
    desc: "خروج کاربر",
    auth: "نیاز به احراز هویت",
    color: "bg-emerald-600",
  },
];

const codeExample = `// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = createUserSchema.parse(body);

  const user = await prisma.user.create({ data });
  return NextResponse.json(user, { status: 201 });
}`;

export default function ApiRoutesPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          لیست Endpointها
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {["Method", "Path", "توضیح", "احراز هویت"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {endpoints.map((e, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md ${e.color} px-2 py-0.5 font-mono text-[10px] font-bold text-white`}
                    >
                      {e.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                    {e.path}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {e.desc}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {e.auth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه کد
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {codeExample}
          </code>
        </pre>
      </section>

      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        💡 <strong>نکته:</strong> در Next.js App Router، هر پوشه‌ای که فایل{" "}
        <span className="font-mono">route.ts</span> دارد، به یک API تبدیل
        می‌شود. از نام‌های پویا مثل{" "}
        <span className="font-mono">[id]</span> برای پارامترها استفاده کن.
      </section>
    </div>
  );
}