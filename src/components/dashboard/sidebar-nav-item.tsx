"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Settings,
  MessageSquare,
  Palette,
  Layers,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------- Icon Map ------------------------- */

const icons: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderOpen,
  Users,
  Settings,
  MessageSquare,
  Palette,
  Layers,
  Tag,
};

/* --------------------------- Types -------------------------- */

export interface SidebarNavItemProps {
  href: string;
  label: string;
  icon?: string;
  badge?: string;
  onClick?: () => void;
}

/* ------------------------- Component ------------------------ */

export function SidebarNavItem({
  href,
  label,
  icon,
  badge,
  onClick,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  const Icon = icon ? icons[icon] : undefined;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground"
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}