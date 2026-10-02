import { prisma } from "@/lib/prisma";
import {
  Badge,
  Card,
} from "flowbite-react";
import {
  HiUser,
  HiDocumentText,
  HiTag,
  HiCog,
  HiKey,
  HiLink,
  HiHashtag,
  HiCalendar,
} from "react-icons/hi";

export const dynamic = "force-dynamic";

/* ---------- تعریف مدل‌ها (منبع مرکزی) ---------- */
type FieldType = "String" | "Int" | "Boolean" | "DateTime" | "Enum";

type Field = {
  name: string;
  type: FieldType;
  attrs?: string[];
  kind: "scalar" | "relation";
};

type Model = {
  name: string;
  icon: typeof HiUser;
  color: string;
  description: string;
  fields: Field[];
  count: number;
};

export default async function ModelsPage() {
  /* ---------- آمار واقعی از دیتابیس ---------- */
  const [userCount, postCount, tagCount, settingCount] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.tag.count(),
    prisma.setting.count(),
  ]);

  const models: Model[] = [
    {
      name: "User",
      icon: HiUser,
      color: "from-blue-500 to-cyan-500",
      description: "کاربران سیستم با نقش‌های مختلف",
      count: userCount,
      fields: [
        { name: "id", type: "String", attrs: ["@id", "@default(cuid())"], kind: "scalar" },
        { name: "email", type: "String", attrs: ["@unique"], kind: "scalar" },
        { name: "name", type: "String", kind: "scalar" },
        { name: "password", type: "String", kind: "scalar" },
        { name: "role", type: "Enum", attrs: ["@default(USER)"], kind: "scalar" },
        { name: "avatar", type: "String", attrs: ["?"], kind: "scalar" },
        { name: "bio", type: "String", attrs: ["?"], kind: "scalar" },
        { name: "posts", type: "String", attrs: ["Post[]"], kind: "relation" },
        { name: "createdAt", type: "DateTime", attrs: ["@default(now())"], kind: "scalar" },
        { name: "updatedAt", type: "DateTime", attrs: ["@updatedAt"], kind: "scalar" },
      ],
    },
    {
      name: "Post",
      icon: HiDocumentText,
      color: "from-emerald-500 to-teal-500",
      description: "پست‌های وبلاگ با دسته‌بندی و تگ",
      count: postCount,
      fields: [
        { name: "id", type: "String", attrs: ["@id", "@default(cuid())"], kind: "scalar" },
        { name: "title", type: "String", kind: "scalar" },
        { name: "slug", type: "String", attrs: ["@unique"], kind: "scalar" },
        { name: "content", type: "String", kind: "scalar" },
        { name: "excerpt", type: "String", attrs: ["?"], kind: "scalar" },
        { name: "published", type: "Boolean", attrs: ["@default(false)"], kind: "scalar" },
        { name: "views", type: "Int", attrs: ["@default(0)"], kind: "scalar" },
        { name: "author", type: "String", attrs: ["User @relation"], kind: "relation" },
        { name: "authorId", type: "String", kind: "scalar" },
        { name: "tags", type: "String", attrs: ["Tag[]"], kind: "relation" },
        { name: "createdAt", type: "DateTime", attrs: ["@default(now())"], kind: "scalar" },
        { name: "updatedAt", type: "DateTime", attrs: ["@updatedAt"], kind: "scalar" },
      ],
    },
    {
      name: "Tag",
      icon: HiTag,
      color: "from-purple-500 to-fuchsia-500",
      description: "تگ‌های قابل استفاده در پست‌ها",
      count: tagCount,
      fields: [
        { name: "id", type: "String", attrs: ["@id", "@default(cuid())"], kind: "scalar" },
        { name: "name", type: "String", attrs: ["@unique"], kind: "scalar" },
        { name: "slug", type: "String", attrs: ["@unique"], kind: "scalar" },
        { name: "posts", type: "String", attrs: ["Post[]"], kind: "relation" },
        { name: "createdAt", type: "DateTime", attrs: ["@default(now())"], kind: "scalar" },
      ],
    },
    {
      name: "Setting",
      icon: HiCog,
      color: "from-slate-500 to-slate-700",
      description: "تنظیمات کلید-مقدار سیستم",
      count: settingCount,
      fields: [
        { name: "id", type: "String", attrs: ["@id", "@default(cuid())"], kind: "scalar" },
        { name: "key", type: "String", attrs: ["@unique"], kind: "scalar" },
        { name: "value", type: "String", kind: "scalar" },
      ],
    },
  ];

  /* ---------- شمارنده آمار کلی ---------- */
  const totalFields = models.reduce((acc, m) => acc + m.fields.length, 0);
  const totalRelations = models.reduce(
    (acc, m) => acc + m.fields.filter((f) => f.kind === "relation").length,
    0
  );

  return (
    <div className="space-y-6">
      {/* آمار کلی */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "تعداد مدل‌ها", value: models.length },
          { label: "کل فیلدها", value: totalFields },
          { label: "روابط", value: totalRelations },
          { label: "کل رکوردها", value: userCount + postCount + tagCount + settingCount },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {s.value.toLocaleString("fa-IR")}
            </p>
          </div>
        ))}
      </div>

      {/* کارت‌های مدل‌ها */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {models.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.name} className="overflow-hidden p-0">
              {/* هدر مدل */}
              <div className="flex items-start justify-between gap-3 border-b border-gray-200 p-5 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} text-white shadow-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold text-gray-900 dark:text-white">
                      {m.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {m.description}
                    </p>
                  </div>
                </div>
                <Badge color="purple" className="w-fit">
                  {m.count.toLocaleString("fa-IR")} رکورد
                </Badge>
              </div>

              {/* فیلدها */}
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {m.fields.map((f) => {
                  const fieldIcon =
                    f.name === "id"
                      ? HiKey
                      : f.kind === "relation"
                      ? HiLink
                      : f.type === "DateTime"
                      ? HiCalendar
                      : f.name.toLowerCase().includes("count") ||
                        f.type === "Int"
                      ? HiHashtag
                      : null;
                  const FieldIcon = fieldIcon;
                  return (
                    <div
                      key={f.name}
                      className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      {FieldIcon ? (
                        <FieldIcon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      ) : (
                        <span className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="w-28 shrink-0 font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
                        {f.name}
                      </span>
                      <span
                        className={`w-20 shrink-0 rounded-md px-2 py-0.5 text-center font-mono text-[10px] font-bold ${
                          f.kind === "relation"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {f.type}
                      </span>
                      <div className="flex flex-1 flex-wrap gap-1">
                        {f.attrs?.map((a, i) => (
                          <span
                            key={i}
                            className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* راهنما */}
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800 dark:border-purple-900 dark:bg-purple-900/20 dark:text-purple-300">
        💡 <strong>راهنما:</strong> برای ویرایش ساختار، فایل{" "}
        <span className="font-mono">prisma/schema.prisma</span> رو تغییر بده و
        بعد{" "}
        <span className="font-mono">npx prisma migrate dev</span> رو اجرا کن.
      </div>
    </div>
  );
}