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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "@/components/form/form-section";

/* =====================================================================
   Schema
   ===================================================================== */

const schema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "At least 2 characters")
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase letters, numbers, and dashes"),
  name: z.string().trim().min(1, "Required").max(100),
  category: z.enum(["sans", "serif", "mono", "display", "handwriting"]),
  description: z.string().trim().max(500).optional(),
  source: z.enum(["google", "custom", "local"]),
  googleFamily: z.string().trim().optional(),
});

type FormValues = z.infer<typeof schema>;

/* =====================================================================
   Options
   ===================================================================== */

const categoryOptions = [
  { value: "sans", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
  { value: "display", label: "Display" },
  { value: "handwriting", label: "Handwriting" },
];

const sourceOptions = [
  { value: "google", label: "Google Fonts" },
  { value: "custom", label: "Custom Upload" },
  { value: "local", label: "Local System" },
];

/* =====================================================================
   Component
   ===================================================================== */

interface FontFamilyFormProps {
  onCreated?: () => void;
}

export function FontFamilyForm({ onCreated }: FontFamilyFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      key: "",
      name: "",
      category: "sans",
      description: "",
      source: "google",
      googleFamily: "",
    },
    mode: "onBlur",
  });

  const source = form.watch("source");

  const submit = form.handleSubmit(async data => {
    setServerError(null);
    try {
      const res = await fetch("/api/font-families", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          styles: ["normal", "italic"],
          subsets: ["latin", "latin-ext"],
          files: [],
        }),
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
      setServerError(err instanceof Error ? err.message : "Failed");
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={submit}
        className="flex flex-col gap-5 rounded-lg border bg-card p-5"
      >
        <div>
          <h2 className="text-base font-semibold">New Font Family</h2>
          <p className="text-xs text-muted-foreground">
            Add a font to your library
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. inter" dir="ltr" {...field} />
                </FormControl>
                <FormDescription>Unique, lowercase</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Inter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={v => field.onChange(v ?? "sans")}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <Select
                  onValueChange={v => field.onChange(v ?? "google")}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sourceOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {source === "google" && (
            <FormField
              control={form.control}
              name="googleFamily"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Google Fonts Family Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Inter (exact name from Google Fonts)"
                      dir="ltr"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    دقیقاً همان اسمی که در fonts.google.com است
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="Optional"
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
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
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
                Add Font
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}