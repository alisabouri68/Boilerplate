import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const users = [
  { id: 1, name: "علی رضایی", email: "ali@example.com", role: "Admin", status: "فعال" },
  { id: 2, name: "مریم احمدی", email: "maryam@example.com", role: "Editor", status: "فعال" },
  { id: 3, name: "رضا کریمی", email: "reza@example.com", role: "User", status: "غیرفعال" },
  { id: 4, name: "سارا نوری", email: "sara@example.com", role: "User", status: "فعال" },
  { id: 5, name: "حسین مرادی", email: "hossein@example.com", role: "Editor", status: "در انتظار" },
];

const statusColor: Record<string, string> = {
  "فعال": "success",
  "غیرفعال": "failure",
  "در انتظار": "warning",
};

const roleColor: Record<string, string> = {
  Admin: "failure",
  Editor: "warning",
  User: "info",
};

export default function TablesPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">جدول پایه</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>نام</TableHeadCell>
                <TableHeadCell>ایمیل</TableHeadCell>
                <TableHeadCell>نقش</TableHeadCell>
                <TableHeadCell>وضعیت</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {users.map((u) => (
                <TableRow key={u.id} className="bg-white dark:border-gray-700 dark:bg-gray-900">
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {u.id}
                  </TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell className="font-mono text-xs text-gray-500">
                    {u.email}
                  </TableCell>
                  <TableCell>
                    <Badge color={roleColor[u.role] as any} className="w-fit">{u.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color={statusColor[u.status] as any} className="w-fit">{u.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">جدول با Checkbox</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell className="p-4">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </TableHeadCell>
                <TableHeadCell>نام محصول</TableHeadCell>
                <TableHeadCell>دسته</TableHeadCell>
                <TableHeadCell>قیمت</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {[
                { name: "هدفون بلوتوث", cat: "صوتی", price: "۲,۴۵۰,۰۰۰" },
                { name: "ساعت هوشمند", cat: "پوشیدنی", price: "۳,۸۰۰,۰۰۰" },
                { name: "کیف چرمی", cat: "لوازم", price: "۱,۲۰۰,۰۰۰" },
              ].map((p) => (
                <TableRow key={p.name} className="bg-white dark:border-gray-700 dark:bg-gray-900">
                  <TableCell className="p-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">{p.name}</TableCell>
                  <TableCell>{p.cat}</TableCell>
                  <TableCell className="font-semibold">{p.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        💡 <strong>نکته:</strong> جدول‌ها رو در موبایل داخل یک{" "}
        <span className="font-mono">overflow-x-auto</span> قرار بده تا اسکرول افقی داشته باشن.
      </section>
    </div>
  );
}