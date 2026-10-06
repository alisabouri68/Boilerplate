"use client";

import Link from "next/link";
import { MailCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <MailCheck className="h-7 w-7 text-primary" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a verification link to your email. Click it to
          activate your account.
        </p>
      </div>

      <div className="rounded-md border bg-muted/40 p-3 text-sm text-left">
        Didn&apos;t receive the email? Check your spam folder or click below to
        resend.
      </div>

      <Button className="w-full gap-2">
        Resend verification email
        <ArrowRight className="h-4 w-4" />
      </Button>

      <Button render variant="ghost" className="w-full">
        <Link href="/login">Back to sign in</Link>
      </Button>
    </div>
  );
}
