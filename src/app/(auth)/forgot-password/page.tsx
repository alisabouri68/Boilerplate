"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthInput } from "@/components/auth/auth-input";
import { FormAlert } from "@/components/auth/form-alert";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");

    // TODO: ارسال ایمیل بازیابی
    await new Promise((r) => setTimeout(r, 900));

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
          <MailCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">
            Check your email
          </h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to your inbox. The link
            expires in 15 minutes.
          </p>
        </div>

        <div className="rounded-md border bg-muted/40 p-3 text-sm">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <button
            onClick={() => setSent(false)}
            className="font-medium text-primary hover:underline"
          >
            try again
          </button>
          .
        </div>

        <Button  variant="outline" className="w-full gap-2">
          <Link href="/login">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
        <p className="text-sm text-muted-foreground">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      {error && <FormAlert type="error" message={error} />}

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

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      <Button  variant="ghost" className="w-full gap-2">
        <Link href="/login">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </Button>
    </div>
  );
}
