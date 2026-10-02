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
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">ورودی متن</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name" value="نام" />
            <TextInput id="name" placeholder="نام خود را وارد کنید" />
          </div>
          <div>
            <Label htmlFor="email" value="ایمیل" />
            <TextInput id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="pass" value="رمز عبور" />
            <TextInput id="pass" type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="disabled" value="غیرفعال" />
            <TextInput id="disabled" disabled value="مقدار قفل‌شده" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Textarea و Select</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="msg" value="پیام" />
            <Textarea id="msg" placeholder="پیام خود را بنویسید..." rows={4} />
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="country" value="کشور" />
              <Select id="country">
                <option>ایران</option>
                <option>افغانستان</option>
                <option>ترکیه</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="file" value="فایل" />
              <FileInput id="file" />
            </div>
          </div>
        </div>
      </section>

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