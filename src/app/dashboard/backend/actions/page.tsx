const actions = [
  {
    name: "createUser",
    desc: "ایجاد کاربر جدید",
    input: "FormData",
    output: "{ success, user?, error? }",
  },
  {
    name: "updateProfile",
    desc: "به‌روزرسانی پروفایل",
    input: "FormData",
    output: "{ success, error? }",
  },
  {
    name: "deleteAccount",
    desc: "حذف حساب کاربری",
    input: "userId",
    output: "{ success }",
  },
  {
    name: "sendEmail",
    desc: "ارسال ایمیل تراکنشی",
    input: "{ to, subject, body }",
    output: "{ messageId }",
  },
];

const codeExample = `// src/app/actions/user.ts
"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const user = await prisma.user.create({ data: parsed.data });
  revalidatePath("/dashboard/users");
  return { success: true, user };
}`;

export default function ActionsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        ⚡ <strong>Server Actions</strong> توابعی هستند که مستقیماً روی سرور
        اجرا می‌شن و بدون نیاز به API Route، از کلاینت فراخوانی می‌شن.
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          لیست Actions
        </h2>
        <div className="space-y-3">
          {actions.map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                  {a.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {a.desc}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                <div className="rounded bg-gray-50 px-3 py-1.5 dark:bg-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">
                    ورودی:
                  </span>{" "}
                  <span className="font-mono text-gray-700 dark:text-gray-300">
                    {a.input}
                  </span>
                </div>
                <div className="rounded bg-gray-50 px-3 py-1.5 dark:bg-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">
                    خروجی:
                  </span>{" "}
                  <span className="font-mono text-gray-700 dark:text-gray-300">
                    {a.output}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه پیاده‌سازی
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {codeExample}
          </code>
        </pre>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          تفاوت با API Route
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {["ویژگی", "Server Action", "API Route"].map((h) => (
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
              {[
                ["نیاز به fetch دستی", "❌", "✅"],
                ["Type Safety خودکار", "✅", "❌"],
                ["قابل استفاده در Third-party", "❌", "✅"],
                ["Progressive Enhancement", "✅", "❌"],
                ["Cache Control", "محدود", "کامل"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 text-gray-700 dark:text-gray-300"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}