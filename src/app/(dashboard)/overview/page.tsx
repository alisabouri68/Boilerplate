import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* ---------- داده‌های نمونه ---------- */

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up' as const,
    icon: DollarSign,
    subtitle: 'from last month',
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    trend: 'up' as const,
    icon: Users,
    subtitle: 'from last month',
  },
  {
    title: 'Orders',
    value: '12,234',
    change: '+19%',
    trend: 'up' as const,
    icon: ShoppingCart,
    subtitle: 'from last month',
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-1.2%',
    trend: 'down' as const,
    icon: TrendingUp,
    subtitle: 'from last month',
  },
]

const revenueData = [
  { month: 'Jan', value: 4200 },
  { month: 'Feb', value: 3800 },
  { month: 'Mar', value: 5100 },
  { month: 'Apr', value: 4600 },
  { month: 'May', value: 6200 },
  { month: 'Jun', value: 7300 },
  { month: 'Jul', value: 6800 },
  { month: 'Aug', value: 8100 },
  { month: 'Sep', value: 7600 },
  { month: 'Oct', value: 9200 },
  { month: 'Nov', value: 8800 },
  { month: 'Dec', value: 10400 },
]

const recentProjects = [
  {
    name: 'AI Chat Platform',
    status: 'In Progress',
    progress: 72,
    members: ['AM', 'SK', 'RH'],
    dueDate: 'Dec 24, 2026',
  },
  {
    name: 'Marketing Dashboard',
    status: 'Completed',
    progress: 100,
    members: ['JD', 'ML'],
    dueDate: 'Nov 12, 2026',
  },
  {
    name: 'Mobile App Redesign',
    status: 'In Progress',
    progress: 45,
    members: ['AM', 'TK', 'LP', 'NR'],
    dueDate: 'Jan 15, 2027',
  },
  {
    name: 'API Integration',
    status: 'At Risk',
    progress: 28,
    members: ['SK'],
    dueDate: 'Dec 05, 2026',
  },
]

const activities = [
  {
    user: 'Ali Emami',
    action: 'created a new project',
    target: 'AI Chat Platform',
    time: '2 min ago',
    icon: CheckCircle2,
    color: 'text-emerald-500',
  },
  {
    user: 'Sara Karimi',
    action: 'commented on',
    target: 'Mobile App Redesign',
    time: '15 min ago',
    icon: Clock,
    color: 'text-blue-500',
  },
  {
    user: 'Reza Hosseini',
    action: 'flagged an issue in',
    target: 'API Integration',
    time: '1 hour ago',
    icon: AlertCircle,
    color: 'text-amber-500',
  },
  {
    user: 'Maryam Lotfi',
    action: 'completed',
    target: 'Marketing Dashboard',
    time: '3 hours ago',
    icon: CheckCircle2,
    color: 'text-emerald-500',
  },
]

/* ---------- کامپوننت‌های کوچک ---------- */

function statusBadgeVariant(status: string) {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    case 'At Risk':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    default:
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  }
}

function RevenueChart() {
  const max = Math.max(...revenueData.map((d) => d.value))
  const width = 800
  const height = 220
  const padding = 30
  const chartW = width - padding * 2
  const chartH = height - padding * 2
  const stepX = chartW / (revenueData.length - 1)

  const points = revenueData.map((d, i) => ({
    x: padding + i * stepX,
    y: padding + chartH - (d.value / max) * chartH,
  }))

  // مسیر خط
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  // مسیر پر شده زیر خط
  const areaPath =
    `M ${padding} ${padding + chartH} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${padding + chartW} ${padding + chartH} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-56"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* خطوط افقی راهنما */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = padding + (chartH / 4) * i
        return (
          <line
            key={i}
            x1={padding}
            x2={padding + chartW}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeDasharray="4 4"
          />
        )
      })}

      {/* ناحیه پر شده */}
      <path d={areaPath} fill="url(#revenueGradient)" />

      {/* خط اصلی */}
      <path
        d={linePath}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* نقاط روی خط */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill="hsl(var(--background))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}

/* ---------- کامپوننت اصلی ---------- */

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* عنوان صفحه */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Download Report
          </Button>
          <Button size="sm">New Project</Button>
        </div>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const isUp = stat.trend === 'up'
          const TrendIcon = isUp ? TrendingUp : TrendingDown

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <span
                    className={
                      isUp
                        ? 'flex items-center gap-0.5 font-medium text-emerald-600 dark:text-emerald-400'
                        : 'flex items-center gap-0.5 font-medium text-rose-600 dark:text-rose-400'
                    }
                  >
                    <TrendIcon className="h-3 w-3" />
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.subtitle}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* نمودار + اهداف */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* نمودار */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground">
                Monthly revenue for the current year
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              +12.5%
            </Badge>
          </div>
          <RevenueChart />
          <div className="mt-4 flex justify-between text-xs text-muted-foreground px-1">
            {revenueData.map((d) => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>
        </div>

        {/* اهداف */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Goals</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-5">
            {[
              { label: 'Monthly Revenue', current: 45231, target: 60000, unit: '$' },
              { label: 'New Users', current: 2350, target: 3000, unit: '' },
              { label: 'Projects Completed', current: 18, target: 25, unit: '' },
            ].map((goal) => {
              const percent = Math.min(
                100,
                Math.round((goal.current / goal.target) * 100)
              )
              return (
                <div key={goal.label}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{goal.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {goal.unit}
                      {goal.current.toLocaleString()} / {goal.unit}
                      {goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-1 text-right text-xs text-muted-foreground">
                    {percent}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* پروژه‌ها + فعالیت‌ها */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* پروژه‌های اخیر */}
        <div className="lg:col-span-2 rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="font-semibold">Recent Projects</h2>
              <p className="text-xs text-muted-foreground">
                You have 4 active projects
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View all
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="divide-y">
            {recentProjects.map((project) => (
              <div key={project.name} className="p-5 hover:bg-muted/40 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-sm truncate">
                        {project.name}
                      </h3>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusBadgeVariant(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Due {project.dueDate}</span>
                      <span>·</span>
                      <span>{project.progress}% complete</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${
                          project.status === 'At Risk'
                            ? 'bg-amber-500'
                            : project.status === 'Completed'
                            ? 'bg-emerald-500'
                            : 'bg-primary'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center -space-x-2 shrink-0">
                    {project.members.slice(0, 3).map((m) => (
                      <Avatar
                        key={m}
                        className="h-7 w-7 border-2 border-background"
                      >
                        <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                          {m}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                        +{project.members.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* فعالیت‌های اخیر */}
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b p-5">
            <h2 className="font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {activities.map((activity, i) => {
                const Icon = activity.icon
                return (
                  <div key={i} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      {i < activities.length - 1 && (
                        <div className="absolute left-1/2 top-full h-4 w-px -translate-x-1/2 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pt-0.5 pb-2">
                      <p className="text-sm leading-tight">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-muted-foreground">
                          {activity.action}
                        </span>{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}