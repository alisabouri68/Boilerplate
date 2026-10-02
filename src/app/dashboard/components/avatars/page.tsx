import { Avatar, AvatarGroup } from "flowbite-react";

export default function AvatarsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">سایزها</h2>
        <div className="flex flex-wrap items-end gap-4">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s} className="text-center">
              <Avatar placeholderInitials="عر" size={s} rounded />
              <div className="mt-2 text-xs text-gray-500">{s}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">شکل‌ها</h2>
        <div className="flex items-center gap-4">
          <Avatar placeholderInitials="عر" size="lg" rounded />
          <Avatar placeholderInitials="ما" size="lg" />
          <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" size="lg" rounded />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">وضعیت</h2>
        <div className="flex items-center gap-4">
          <Avatar placeholderInitials="عر" rounded status="online" statusPosition="bottom-right" />
          <Avatar placeholderInitials="ما" rounded status="busy" statusPosition="bottom-right" />
          <Avatar placeholderInitials="رک" rounded status="away" statusPosition="bottom-right" />
          <Avatar placeholderInitials="سن" rounded status="offline" statusPosition="bottom-right" />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">گروه آواتارها</h2>
        <AvatarGroup>
          <Avatar placeholderInitials="ع" rounded stacked />
          <Avatar placeholderInitials="م" rounded stacked />
          <Avatar placeholderInitials="ر" rounded stacked />
          <Avatar placeholderInitials="س" rounded stacked />
          <Avatar placeholderInitials="+۵" rounded stacked />
        </AvatarGroup>
      </section>
    </div>
  );
}