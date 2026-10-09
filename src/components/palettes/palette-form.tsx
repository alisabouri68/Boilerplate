"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, AlertCircle, Wand2 } from "lucide-react";
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
import { ShadesEditor } from "./shades-editor";
import {
  EMPTY_SHADES,
  PRESET_RED,
  type PaletteShades,
} from "@/lib/colors/palette-utils";

const hexSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/, "Invalid HEX");

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
  shades: z.object({
    50:  hexSchema,
    100: hexSchema,
    200: hexSchema,
    300: hexSchema,
    400: hexSchema,
    500: hexSchema,
    600: hexSchema,
    700: hexSchema,
    800: hexSchema,
    900: hexSchema,
    950: hexSchema,
  }),
});

type FormValues = z.infer<typeof schema>;

interface PaletteFormProps {
  onCreated?: () => void;
}

export function PaletteForm({ onCreated }: PaletteFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      key: "",
      name: "",
      description: "",
      shades: { ...EMPTY_SHADES },
    },
    mode: "onBlur",
  });

  const submit = form.handleSubmit(async data => {
    setServerError(null);
    try {
      const res = await fetch("/api/palettes", {
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

      form.reset({
        key: "",
        name: "",
        description: "",
        shades: { ...EMPTY_SHADES },
      });
      onCreated?.();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed");
    }
  });

  function loadPresetRed() {
    form.setValue("shades", { ...PRESET_RED }, { shouldDirty: true });
  }

  function resetShades() {
    form.setValue("shades", { ...EMPTY_SHADES }, { shouldDirty: true });
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={submit}
        className="flex flex-col gap-5 rounded-lg border bg-card p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">New Palette</h2>
            <p className="text-xs text-muted-foreground">
              Define 11 shades (50 → 950) with HEX colors
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={loadPresetRed}
            >
              <Wand2 className="mr-2 h-3.5 w-3.5" />
              Load preset (red)
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetShades}
            >
              Reset
            </Button>
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
                    placeholder="e.g. red, brand-primary"
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
                  <Input placeholder="e.g. Red" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
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

        <Controller
          control={form.control}
          name="shades"
          render={({ field, fieldState }) => (
            <ShadesEditor
              value={field.value as PaletteShades}
              onChange={field.onChange}
              errors={
                fieldState.error
                  ? Object.fromEntries(
                      Object.entries(fieldState.error).map(([k, v]) => [
                        k,
                        (v as { message?: string })?.message ?? "Invalid",
                      ])
                    )
                  : undefined
              }
            />
          )}
        />

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
                Create Palette
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}