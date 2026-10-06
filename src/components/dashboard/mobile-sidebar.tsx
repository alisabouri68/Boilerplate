'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarNavItem } from '@/components/dashboard/sidebar-nav-item'
import { navGroups } from '@/config/nav'

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r bg-card shadow-xl flex flex-col">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Link
                href="/overview"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                  B
                </div>
                <span className="font-semibold">Boilerplate</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 px-3 py-4">
              <nav className="space-y-6">
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </p>
                    <div
                      className="space-y-0.5"
                      onClick={() => setOpen(false)}
                    >
                      {group.items.map((item) => (
                        <SidebarNavItem key={item.href} {...item} />
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </aside>
        </div>
      )}
    </>
  )
}
