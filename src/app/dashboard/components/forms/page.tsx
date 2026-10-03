"use client";

import {
  Checkbox,
  FileInput,
  Label,
  Radio,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";

export default function FormsPage() {
  return (
    <div className="space-y-8">
      {/* ورودی متن */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">ورودی متن</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">نام</Label>
            <TextInput id="name" placeholder="نام خود را وارد کنید" />
          </div>
          <div>
            <Label htmlFor="email">ایمیل</Label>
            <TextInput id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="pass">رمز عبور</Label>
            <TextInput id="pass" type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="disabled">غیرفعال</Label>
            <TextInput id="disabled" disabled defaultValue="مقدار قفل‌شده" />
          </div>
        </div>
      </section>

      {/* Textarea و Select */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Textarea و Select</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="msg">پیام</Label>
            <Textarea id="msg" placeholder="پیام خود را بنویسید..." rows={4} />
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="country">کشور</Label>
              <Select id="country">
                <option>ایران</option>
                <option>افغانستان</option>
                <option>ترکیه</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="file">فایل</Label>
              <FileInput id="file" />
            </div>
          </div>
        </div>
      </section>

      {/* انتخابی‌ها */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">انتخابی‌ها</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="c1" defaultChecked />
            <Label htmlFor="c1">ذخیره اطلاعات</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="c2" />
            <Label htmlFor="c2">ارسال خبرنامه</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="r1" name="gender" defaultChecked />
            <Label htmlFor="r1">مرد</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="r2" name="gender" />
            <Label htmlFor="r2">زن</Label>
          </div>
        </div>
      </section>

      {/* Toggle و Switch */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Toggle و Switch</h2>
        <div className="space-y-4">
          <ToggleSwitch checked label="اعلان‌ها" onChange={() => {}} />
          <ToggleSwitch checked={false} label="حالت تاریک خودکار" onChange={() => {}} />
        </div>
      </section>
    </div>
  );
}