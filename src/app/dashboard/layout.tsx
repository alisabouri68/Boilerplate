import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "داشبورد | پنل پرو",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}