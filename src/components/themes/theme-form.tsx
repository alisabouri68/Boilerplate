"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "At least 2 characters")
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase letters, numbers, and dashes"),
  name: z.string().trim().min(1, "Required").max(100),
  description: z.string().trim().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

interface ThemeFormProps {
  onCreated?: () => void;
}

export function ThemeForm({ onCreated }: ThemeFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: { key: "", name: "", description: "" },
    mode: "onBlur",
  });

  const submit = form.handleSubmit(async data => {
    setServerError(null);
    try {
      const res = await fetch("/api/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        const fieldErrors = json?.errors?.fieldErrors;
        if (fieldErrors) {
          const first = Object.values(fieldErrors).flat()[0];
          throw new Error(String(first));
        }
        throw new Error(json?.message ?? `Failed (${res.status})`);
      }

      form.reset();
      onCreated?.();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to create");
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={submit}
        className="flex flex-col gap-4 rounded-lg border bg-card p-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">New Theme</h2>
            <p className="text-xs text-muted-foreground">
              Define a new theme skeleton (values can be set later)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. light, dark, ocean"
                    dir="ltr"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Lowercase, unique identifier
                </FormDescription>
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
                  <Input placeholder="e.g. Popcorn" {...field} />
                </FormControl>
                <FormDescription>Shown in the UI</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="Optional short description..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {serverError ? (
          <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{serverError}</span>
          </div>
        ) : null}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Theme
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}