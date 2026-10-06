import Link from 'next/link'
import { Sparkles, ShieldCheck, Zap } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: decorative panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 lg:flex lg:flex-col lg:justify-between p-10 text-primary-foreground">
        {/* grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* blur circles */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur text-primary-foreground text-sm font-bold ring-1 ring-white/20">
            B
          </div>
          <span className="font-semibold text-lg tracking-tight">Boilerplate</span>
        </div>

        {/* Middle content */}
        <div className="relative max-w-md space-y-6">
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Build faster with a production-ready starter.
          </h2>
          <p className="text-primary-foreground/80">
            Everything you need to ship your next SaaS — authentication, dashboard, billing, and more.
          </p>

          <ul className="space-y-3 pt-4">
            {[
              { icon: Zap, text: 'Pre-built auth flows' },
              { icon: ShieldCheck, text: 'Secure by default' },
              { icon: Sparkles, text: 'Beautiful UI components' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15 ring-1 ring-white/20">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="relative text-sm text-primary-foreground/70">
          © 2026 Boilerplate. All rights reserved.
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center bg-muted/30 p-6 lg:p-10">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile logo */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 lg:hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              B
            </div>
            <span className="font-semibold text-lg">Boilerplate</span>
          </Link>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            {children}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
