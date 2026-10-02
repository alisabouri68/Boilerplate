import Link from "next/link";
import { HiOutlineHeart } from "react-icons/hi";

const footerLinks = [
  { href: "/dashboard/about", label: "درباره ما" },
  { href: "/dashboard/privacy", label: "حریم خصوصی" },
  { href: "/dashboard/terms", label: "قوانین" },
  { href: "/dashboard/contact", label: "تماس با ما" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-4 md:px-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        {/* کپی‌رایت */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {year} پنل پرو — تمامی حقوق محفوظ است.
        </p>

        {/* لینک‌ها */}
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* سازنده */}
        <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          ساخته شده با
          <HiOutlineHeart className="h-3.5 w-3.5 text-red-500" />
          در ایران
        </p>
      </div>
    </footer>
  );
}