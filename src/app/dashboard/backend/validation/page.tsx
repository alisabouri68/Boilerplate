const schemas = [
  {
    name: "createUserSchema",
    fields: [
      { name: "name", type: "string", rules: "min 2, max 50" },
      { name: "email", type: "string", rules: "email" },
      { name: "age", type: "number", rules: "min 18, optional" },
      { name: "role", type: "enum", rules: "'user' | 'admin'" },
    ],
  },
  {
    name: "loginSchema",
    fields: [
      { name: "email", type: "string", rules: "email" },
      { name: "password", type: "string", rules: "min 8" },
    ],
  },
];

const codeExample = `// src/lib/validations/user.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام حداکثر ۵۰ کاراکتر"),
  email: z
    .string()
    .email("ایمیل نامعتبر است"),
  age: z
    .number()
    .min(18, "سن باید حداقل ۱۸ سال باشد")
    .optional(),
  role: z.enum(["user", "admin"]).default("user"),
});

// استخراج تایپ TypeScript
export type CreateUserInput = z.infer<typeof createUserSchema>;

// استفاده در Server Action
const parsed = createUserSchema.safeParse(formData);
if (!parsed.success) {
  return { errors: parsed.error.flatten().fieldErrors };
}`;

export default function ValidationPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300">
        ✅ <strong>Zod</strong> کتابخانه اعتبارسنجی type-safe است که هم در
        Runtime و هم در Compile-time کار می‌کنه.
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Schemaهای پروژه
        </h2>
        <div className="space-y-4">
          {schemas.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="mb-3 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {s.name}
              </h3>
              <div className="space-y-2">
                {s.fields.map((f) => (
                  <div
                    key={f.name}
                    className="flex flex-wrap items-center gap-3 text-xs"
                  >
                    <span className="w-20 font-mono font-semibold text-gray-700 dark:text-gray-300">
                      {f.name}
                    </span>
                    <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {f.type}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {f.rules}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
    </div>
  );
}