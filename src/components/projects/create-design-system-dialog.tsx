"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Library, Wand2, Check, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

/* =====================================================================
   Schema
   ===================================================================== */

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase, numbers, dashes"),
  description: z.string().trim().max(1000).optional(),
  mode: z.enum(["library", "custom"]),
});

type FormValues = z.infer<typeof schema>;

/* =====================================================================
   Types
   ===================================================================== */

interface ThemeOption {
  _id: string;
  key: string;
  name: string;
  description?: string;
}

interface CreateDesignSystemDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  projectId: string;
  onCreated: () => void;
}

/* =====================================================================
   Component
   ===================================================================== */

export function CreateDesignSystemDialog({
  open,
  onOpenChange,
  projectId,
  onCreated,
}: CreateDesignSystemDialogProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [themes, setThemes] = useState<ThemeOption[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      name: "Design System",
      slug: "design-system",
      description: "",
      mode: "custom",
    },
  });

  const mode = form.watch("mode");

  /* --------------------- Load library themes ---------------------- */

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoadingThemes(true);

    (async () => {
      try {
        const res = await fetch("/api/themes");
        const text = await res.text();
        const json = text ? JSON.parse(text) : {};

        if (!res.ok || !json.success) throw new Error("Failed to load themes");

        if (cancelled) return;
        const items: ThemeOption[] = json.data.items ?? [];
        setThemes(items);
        setSelected(new Set(items.map(t => t.key)));
      } catch (err) {
        if (!cancelled) {
          setServerError(
            err instanceof Error ? err.message : "Failed to load themes"
          );
        }
      } finally {
        if (!cancelled) setLoadingThemes(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  /* ----------------------------- Filter --------------------------- */

  const filteredThemes = themes.filter(t => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.key.toLowerCase().includes(q) ||
      (t.description ?? "").toLowerCase().includes(q)
    );
  });

  /* ----------------------------- Toggle --------------------------- */

  function toggleTheme(key: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(themes.map(t => t.key)));
  }

  function selectNone() {
    setSelected(new Set());
  }

  /* ----------------------------- Submit --------------------------- */

  const submit = form.handleSubmit(async data => {
    setServerError(null);

    if (data.mode === "custom" && selected.size === 0) {
      setServerError("Please select at least one theme");
      return;
    }

    try {
      const res = await fetch(`/api/projects/${projectId}/design-system`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          slug: data.slug,
          description: data.description,
          mode: data.mode,
          themeKeys: Array.from(selected),
        }),
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? `Failed (${res.status})`);
      }

      onCreated();
      onOpenChange(false);
      form.reset();
      setSelected(new Set());
      setSearch("");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed");
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  /* --------------------------- Mode cards ------------------------- */

  const modeCards = [
    {
      value: "custom" as const,
      icon: Wand2,
      title: "Select Themes",
      desc: "Choose which themes to include",
    },
    {
      value: "library" as const,
      icon: Library,
      title: "Full Library",
      desc: "Include every theme from the library",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent className="!max-w-4xl !w-[90vw] max-h-[90vh] overflow-hidden p-0">        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg">Create Design System</DialogTitle>
          <DialogDescription>
            Pick the themes to include. States, tokens, and palettes always come
            along.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={submit} className="flex flex-col">
            {/* Scrollable content */}
            <div className="flex flex-col gap-6 overflow-y-auto px-6 py-5 max-h-[60vh]">
              {/* Mode picker */}
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start from</FormLabel>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {modeCards.map(card => {
                        const Icon = card.icon;
                        const active = field.value === card.value;

                        return (
                          <button
                            key={card.value}
                            type="button"
                            onClick={() => field.onChange(card.value)}
                            className={cn(
                              "flex items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                              active
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "hover:bg-accent"
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                                active
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{card.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {card.desc}
                              </p>
                            </div>
                            {active && (
                              <Check className="h-4 w-4 text-primary shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </FormItem>
                )}
              />

              {/* Theme picker — only in custom mode */}
              {mode === "custom" && (
                <div className="flex flex-col gap-3 rounded-lg border">
                  {/* Header with search + actions */}
                  <div className="flex flex-col gap-3 border-b p-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search themes..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9 h-9"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {selected.size} / {themes.length}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={selectAll}
                        className="h-8"
                      >
                        All
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={selectNone}
                        className="h-8"
                      >
                        None
                      </Button>
                    </div>
                  </div>

                  {/* Grid of themes */}
                  <div className="max-h-80 overflow-y-auto p-3">
                    {loadingThemes ? (
                      <div className="flex items-center justify-center py-10">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : themes.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No themes in the library yet. Create some first.
                      </p>
                    ) : filteredThemes.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No themes match your search.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredThemes.map(t => {
                          const checked = selected.has(t.key);
                          return (
                            <button
                              key={t._id}
                              type="button"
                              onClick={() => toggleTheme(t.key)}
                              className={cn(
                                "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                                checked
                                  ? "border-primary bg-primary/5"
                                  : "hover:bg-accent"
                              )}
                            >
                              <Checkbox
                                checked={checked}
                                className="mt-0.5"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {t.name}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="mt-1 font-mono text-[10px]"
                                >
                                  {t.key}
                                </Badge>
                                {t.description && (
                                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                                    {t.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Name + Slug + Description */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input dir="ltr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
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
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-sm text-destructive">
                  {serverError}
                </div>
              ) : null}
            </div>

            {/* Sticky footer */}
            <DialogFooter className="border-t bg-muted/30 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Design System"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}