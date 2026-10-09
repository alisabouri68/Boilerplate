import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { NotificationsMenu } from "@/components/dashboard/notifications-menu";
import { UserMenu } from "@/components/dashboard/user-menu";
import { CommandMenu } from "@/components/dashboard/command-menu";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            D
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Design System
          </span>
        </div>

        <SidebarNav />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-3 border-b bg-card px-4 sm:px-6">
          <MobileSidebar />
          <CommandMenu />

          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <NotificationsMenu />
            <Separator orientation="vertical" className="h-6 mx-1" />
            <UserMenu />
          </div>
        </header>

        <div className="border-b bg-card/50 px-4 sm:px-6 py-2.5">
          <Breadcrumbs />
        </div>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}