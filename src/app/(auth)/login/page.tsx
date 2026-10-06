'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Mail, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthInput } from '@/components/auth/auth-input'
import { PasswordInput } from '@/components/auth/password-input'
import { SocialButtons } from '@/components/auth/social-buttons'
import { OrDivider } from '@/components/auth/or-divider'
import { FormAlert } from '@/components/auth/form-alert'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') || '')
    const password = String(data.get('password') || '')

    // TODO: اتصال به auth واقعی
    // const res = await signIn('credentials', { email, password, redirect: false })
    // if (res?.error) setError('Invalid email or password')
    // else router.push('/overview')

    await new Promise((r) => setTimeout(r, 800))

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    window.location.href = '/overview'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Social */}
      <SocialButtons />

      <OrDivider />

      {/* Error */}
      {error && <FormAlert type="error" message={error} />}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <AuthInput
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="h-4 w-4" />}
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-input accent-primary"
          />
          <span className="text-muted-foreground">Remember me for 30 days</span>
        </label>

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
