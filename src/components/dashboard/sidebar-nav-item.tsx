"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { icons, type NavItem } from "@/config/nav";

export function SidebarNavItem({
  href,
  label,
  icon,
  badge,
  children,
}: NavItem) {
  const pathname = usePathname();
  const hrenderren = !!(children && children.length > 0);

  const isChildActive =
    hrenderren &&
    children!.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + "/"),
    );

  const isActive = pathname === href || pathname.startsWith(href + "/");

  const [open, setOpen] = useState(isChildActive || isActive);

  const Icon = icon ? icons[icon] : undefined;

  // بدون زیرمنو
  if (!hrenderren) {
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="flex-1">{label}</span>
        {badge && (
          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
            {badge}
          </span>
        )}
      </Link>
    );
  }

  // با زیرمنو
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive || isChildActive
            ? "text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="flex-1 text-left">{label}</span>
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </button>

      {open && (
        <div className="mt-0.5 ml-4 space-y-0.5 border-l border-border pl-3">
          {children!.map((child) => {
            const childActive =
              pathname === child.href ||
              (child.href !== href && pathname.startsWith(child.href + "/"));
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                  childActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
