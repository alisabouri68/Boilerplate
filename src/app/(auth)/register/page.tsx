'use client'

import { useState, FormEvent, useMemo } from 'react'
import Link from 'next/link'
import { Mail, User, Loader2, ArrowRight, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthInput } from '@/components/auth/auth-input'
import { PasswordInput } from '@/components/auth/password-input'
import { SocialButtons } from '@/components/auth/social-buttons'
import { OrDivider } from '@/components/auth/or-divider'
import { FormAlert } from '@/components/auth/form-alert'
import { cn } from '@/lib/utils'

function getPasswordStrength(pwd: string) {
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')

  const strength = useMemo(() => getPasswordStrength(password), [password])

  const rules = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', ok: /[a-z]/.test(password) },
    { label: 'One number', ok: /\d/.test(password) },
    { label: 'One special character', ok: /[^A-Za-z0-9]/.test(password) },
  ]

  const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']
  const strengthColors = [
    'bg-muted',
    'bg-rose-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-emerald-600',
  ]

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') || '')
    const name = String(data.get('name') || '')
    const confirm = String(data.get('confirm') || '')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (strength < 3) {
      setError('Please choose a stronger password.')
      return
    }

    setLoading(true)
    // TODO: اتصال به API ثبت‌نام
    await new Promise((r) => setTimeout(r, 900))
    window.location.href = '/overview'
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Get started with your free account
        </p>
      </div>

      <SocialButtons />
      <OrDivider />

      {error && <FormAlert type="error" message={error} />}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <AuthInput
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            icon={<User className="h-4 w-4" />}
            autoComplete="name"
            required
          />
        </div>

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
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Strength bar */}
          {password.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="flex flex-1 gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-colors',
                        i < strength ? strengthColors[strength] : 'bg-muted'
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground w-20 text-right">
                  {strengthLabels[strength]}
                </span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 pt-1">
                {rules.map((rule) => (
                  <li
                    key={rule.label}
                    className={cn(
                      'flex items-center gap-1.5 text-xs transition-colors',
                      rule.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
                    )}
                  >
                    {rule.ok ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirm" className="text-sm font-medium">
            Confirm password
          </label>
          <PasswordInput
            id="confirm"
            name="confirm"
            placeholder="••••••••"
            autoComplete="new-password"
            required
          />
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
          />
          <span className="text-muted-foreground">
            I agree to the{' '}
            <Link href="/terms" className="text-foreground underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-foreground underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
