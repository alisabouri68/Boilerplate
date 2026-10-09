"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNavItem } from "./sidebar-nav-item";
import { navGroups } from "@/config/nav";

export function SidebarNav() {
  return (
    <ScrollArea className="flex-1 px-3 py-4">
      <nav className="space-y-6">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(item => (
                <SidebarNavItem key={item.href} {...item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
}