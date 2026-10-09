"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  key: z.string().trim().toLowerCase().min(1, "Required").max(60)
    .regex(/^[a-z0-9][a-z0-9-]*$/, "Only lowercase, numbers, dashes"),
  name: z.string().trim().min(1, "Required").max(100),
  value: z.string().trim().min(1, "Required").max(30),
  lineHeight: z.string().trim().max(30).optional(),
  letterSpacing: z.string().trim().max(30).optional(),
  order: z.coerce.number().int().min(0).default(0),
});

type FormValues = z.infer<typeof schema>;

interface FontSizeFormProps {
  onCreated?: () => void;
}

export function FontSizeForm({ onCreated }: FontSizeFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      key: "", name: "", value: "1rem",
      lineHeight: "1.5rem", letterSpacing: "", order: 0,
    },
    mode: "onBlur",
  });

  const submit = form.handleSubmit(async data => {
    setServerError(null);
    try {
      const res = await fetch("/api/font-sizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? "Failed");
      }

      form.reset();
      onCreated?.();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed");
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={submit} className="flex flex-col gap-4 rounded-lg border bg-card p-5">
        <div>
          <h2 className="text-base font-semibold">New Font Size</h2>
          <p className="text-xs text-muted-foreground">
            Add a size (e.g. sm: 0.875rem)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. sm" dir="ltr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Small" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input placeholder="0.875rem" dir="ltr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lineHeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Line Height</FormLabel>
                <FormControl>
                  <Input placeholder="1.25rem" dir="ltr" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="letterSpacing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Letter Spacing</FormLabel>
                <FormControl>
                  <Input placeholder="-0.01em" dir="ltr" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    dir="ltr"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {serverError ? (
          <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        ) : null}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</>
            ) : (
              <><Plus className="mr-2 h-4 w-4" />Add Size</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}