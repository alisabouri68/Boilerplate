"use client";

import { useState, FormEvent, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/auth/password-input";
import { FormAlert } from "@/components/auth/form-alert";
import { cn } from "@/lib/utils";

function ResetForm() {
  const params = useSearchParams();
  const token = params.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const rules = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains a letter", ok: /[A-Za-z]/.test(password) },
  ];
  const allOk = rules.every((r) => r.ok);
  const matches = password.length > 0 && password === confirm;

  const canSubmit = useMemo(
    () => allOk && matches && !!token,
    [allOk, matches, token],
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Missing reset token. Please request a new link.");
      return;
    }
    if (!canSubmit) {
      setError("Please meet all password requirements.");
      return;
    }

    setLoading(true);
    // TODO: ارسال به API
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
    setLoading(false);
  }

  // بدون توکن
  if (!token) {
    return (
      <div className="space-y-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight">Invalid link</h1>
          <p className="text-sm text-muted-foreground">
            This password reset link is invalid or has expired.
          </p>
        </div>

        <FormAlert
          type="error"
          message="Please request a new password reset email."
        />

        <Button render className="w-full">
          <Link href="/forgot-password">Request new link</Link>
        </Button>
      </div>
    );
  }

  // موفق
  if (done) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
          <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">
            Password updated
          </h1>
          <p className="text-sm text-muted-foreground">
            Your password has been successfully reset. You can now sign in.
          </p>
        </div>

        <Button render className="w-full gap-2">
          <Link href="/login">
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  // فرم
  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
        <p className="text-sm text-muted-foreground">
          Choose a strong password to secure your account.
        </p>
      </div>

      {error && <FormAlert type="error" message={error} />}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">New password</label>
          <PasswordInput
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <ul className="mt-2 space-y-1">
            {rules.map((rule) => (
              <li
                key={rule.label}
                className={cn(
                  "flex items-center gap-1.5 text-xs",
                  rule.ok
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground",
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

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Confirm password</label>
          <PasswordInput
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {confirm.length > 0 && !matches && (
            <p className="text-xs text-destructive">Passwords do not match.</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full gap-2"
          disabled={loading || !canSubmit}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating…
            </>
          ) : (
            <>
              Reset password
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  );
}
