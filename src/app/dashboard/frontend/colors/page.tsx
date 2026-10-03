import ColorsBuilder from "./_components/ColorsBuilder";

export const metadata = { title: "رنگ‌ها | دیزاین سیستم" };

export default function ColorsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <ColorsBuilder />
    </div>
  );
}