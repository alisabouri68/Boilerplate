import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarNavItem } from '@/components/dashboard/sidebar-nav-item'
import { MobileSidebar } from '@/components/dashboard/mobile-sidebar'
import { ThemeToggle } from '@/components/dashboard/theme-toggle'
import { NotificationsMenu } from '@/components/dashboard/notifications-menu'
import { UserMenu } from '@/components/dashboard/user-menu'
import { CommandMenu } from '@/components/dashboard/command-menu'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { Button } from '@/components/ui/button'
import { navGroups } from '@/config/nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            B
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Boilerplate
          </span>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <SidebarNavItem key={item.href} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium text-primary">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Unlock advanced features
            </p>
            <Button size="sm" className="mt-3 w-full">
              Learn More
            </Button>
          </div>
        </div>
      </aside>

      {/* Right side */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-3 border-b bg-card px-4 sm:px-6">
          {/* Mobile menu */}
          <MobileSidebar />

          {/* Command menu — search trigger */}
          <CommandMenu />

          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <NotificationsMenu />
            <Separator orientation="vertical" className="h-6 mx-1" />
            <UserMenu />
          </div>
        </header>

        {/* Breadcrumbs bar */}
        <div className="border-b bg-card/50 px-4 sm:px-6 py-2.5">
          <Breadcrumbs />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
