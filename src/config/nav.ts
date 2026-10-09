export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
    ],
  },
  {
    label: "Manage",
    items: [
      { label: "Customers", href: "/customers", icon: "Users" },
    ],
  },
  {
    label: "Design System",
    items: [
      { label: "Typography", href: "/typography", icon: "Type" },
      { label: "Palettes", href: "/palettes", icon: "Palette" },
      { label: "States", href: "/states", icon: "Layers" },
      { label: "Tokens", href: "/tokens", icon: "Tag" },
      { label: "Themes", href: "/themes", icon: "MessageSquare" },
    ],
  },
];