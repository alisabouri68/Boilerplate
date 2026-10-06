'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import {
  Search,
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Users,
  Settings,
  BookOpen,
  MessageSquare,
  Plus,
  UserPlus,
  LogOut,
} from 'lucide-react'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const run = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  return (
    <>
      {/* Trigger button — در هدر استفاده می‌شود */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center w-full max-w-sm h-9 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
      >
        <Search className="h-4 w-4 mr-2" />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              className="rounded-xl border bg-popover shadow-2xl overflow-hidden"
              loop
            >
              <div className="flex items-center border-b px-3">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className="flex h-11 w-full bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px]">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  <Item onSelect={() => run('/overview')} icon={LayoutDashboard}>
                    Overview
                  </Item>
                  <Item onSelect={() => run('/projects')} icon={FolderOpen}>
                    Projects
                  </Item>
                  <Item onSelect={() => run('/analytics')} icon={BarChart3}>
                    Analytics
                  </Item>
                  <Item onSelect={() => run('/users')} icon={Users}>
                    Users
                  </Item>
                  <Item onSelect={() => run('/settings')} icon={Settings}>
                    Settings
                  </Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-border" />

                <Command.Group
                  heading="Actions"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  <Item
                    onSelect={() => run('/projects/new')}
                    icon={Plus}
                    shortcut="⌘N"
                  >
                    Create new project
                  </Item>
                  <Item
                    onSelect={() => run('/users/new')}
                    icon={UserPlus}
                  >
                    Invite user
                  </Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-border" />

                <Command.Group
                  heading="Resources"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  <Item onSelect={() => run('/docs')} icon={BookOpen}>
                    Documentation
                  </Item>
                  <Item onSelect={() => run('/support')} icon={MessageSquare}>
                    Support
                  </Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-border" />

                <Item
                  onSelect={() => {
                    setOpen(false)
                    // TODO: logout
                  }}
                  icon={LogOut}
                >
                  Log out
                </Item>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}

function Item({
  children,
  icon: Icon,
  onSelect,
  shortcut,
}: {
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
  onSelect: () => void
  shortcut?: string
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1">{children}</span>
      {shortcut && (
        <kbd className="font-mono text-[10px] text-muted-foreground">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  )
}
