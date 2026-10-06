import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Users,
  Settings,
  BookOpen,
  Plug,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  href: string
  label: string
  icon?: string
  badge?: string
  children?: NavItem[]
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const icons: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Users,
  Settings,
  BookOpen,
  Plug,
  MessageSquare,
}

export const navGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { href: '/overview',  label: 'Overview',  icon: 'LayoutDashboard' },
      { href: '/analytics', label: 'Analytics', icon: 'BarChart3' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        href: '/projects',
        label: 'Projects',
        icon: 'FolderOpen',
        children: [
          { href: '/projects',     label: 'All Projects' },
          { href: '/projects/new', label: 'New Project' },
        ],
      },
      {
        href: '/users',
        label: 'Users',
        icon: 'Users',
        children: [
          { href: '/users',     label: 'All Users' },
          { href: '/users/new', label: 'New User' },
        ],
      },
      {
        href: '/support',
        label: 'Support',
        icon: 'MessageSquare',
        children: [
          { href: '/support',         label: 'Support Home' },
          { href: '/support/tickets', label: 'Tickets' },
        ],
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        href: '/settings',
        label: 'Settings',
        icon: 'Settings',
        children: [
          { href: '/settings/profile',       label: 'Profile' },
          { href: '/settings/account',       label: 'Account' },
          { href: '/settings/notifications', label: 'Notifications' },
          { href: '/settings/billing',       label: 'Billing' },
          { href: '/settings/team',          label: 'Team' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      { href: '/docs',     label: 'Documentation', icon: 'BookOpen' },
      { href: '/docs/api', label: 'API Reference', icon: 'Plug' },
    ],
  },
]
