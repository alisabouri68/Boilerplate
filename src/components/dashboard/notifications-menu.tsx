'use client'

import { useRouter } from 'next/navigation'
import {
  Bell,
  CheckCheck,
  MessageSquare,
  UserPlus,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

const notifications = [
  {
    id: 1,
    icon: MessageSquare,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'New comment on AI Chat Platform',
    description: 'Sara Karimi mentioned you in a comment',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    icon: UserPlus,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    title: 'New team member joined',
    description: 'Reza Hosseini accepted your invitation',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    icon: AlertCircle,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    title: 'Project deadline approaching',
    description: 'API Integration is due in 3 days',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 4,
    icon: CheckCheck,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
    title: 'Marketing Dashboard completed',
    description: 'All tasks have been finished',
    time: 'Yesterday',
    unread: false,
  },
]

export function NotificationsMenu() {
  const router = useRouter()
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 justify-center rounded-full p-0 px-1 text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-3 border-b">
          <div>
            <p className="text-sm font-semibold">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount} unread
            </p>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
            <CheckCheck className="h-3 w-3" />
            Mark all
          </Button>
        </div>

        <ScrollArea className="h-[340px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div>
              {notifications.map((n) => {
                const Icon = n.icon
                return (
                  <button
                    key={n.id}
                    className="flex w-full items-start gap-3 p-3 text-left transition-colors hover:bg-muted/50 border-b last:border-b-0"
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${n.bg}`}
                    >
                      <Icon className={`h-4 w-4 ${n.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">
                          {n.title}
                        </p>
                        {n.unread && (
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {n.description}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {n.time}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator className="m-0" />
        <div className="p-1">
          <DropdownMenuItem
            onClick={() => router.push('/notifications')}
            className="w-full justify-center text-sm text-primary cursor-pointer"
          >
            View all notifications
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}