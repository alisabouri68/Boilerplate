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
  order: z.coerce.number().int().min(0).default(0),
});

type FormValues = z.infer<typeof schema>;

interface StateFormProps {
  onCreated?: () => void;
}

export function StateForm({ onCreated }: StateFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: { key: "", name: "", description: "", order: 0 },
    mode: "onBlur",
  });

  const submit = form.handleSubmit(async data => {
    setServerError(null);
    try {
      const res = await fetch("/api/states", {
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

      form.reset({ key: "", name: "", description: "", order: 0 });
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
        className="flex flex-col gap-4 rounded-lg border bg-card p-5"
      >
        <div>
          <h2 className="text-base font-semibold">New State</h2>
          <p className="text-xs text-muted-foreground">
            Define a semantic state (brand, success, warning, ...)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. brand"
                    dir="ltr"
                    {...field}
                  />
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Brand" {...field} />
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
                <FormDescription>Sort priority</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="Optional description..."
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
                Create State
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}