"use client";

import { useMemo, useState } from "react";
import { Search, Loader2, Download, Check } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { GOOGLE_FONTS_PRESETS } from "@/lib/config/google-fonts";
import { cn } from "@/lib/utils";

interface ImportGoogleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** فونت‌های موجود (برای غیرفعال کردن) */
  existingKeys?: string[];
  onImported: () => void;
}

export function ImportGoogleDialog({
  open,
  onOpenChange,
  existingKeys = [],
  onImported,
}: ImportGoogleDialogProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return GOOGLE_FONTS_PRESETS.filter((p) => {
      if (filterCategory !== "all" && p.category !== filterCategory) {
        return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return (
          p.family.toLowerCase().includes(q) ||
          (p.key ?? "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, filterCategory]);

  function toggle(family: string) {
    const key = GOOGLE_FONTS_PRESETS.find((p) => p.family === family)?.key;
    if (key && existingKeys.includes(key)) return; // قبلاً import شده

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(family)) next.delete(family);
      else next.add(family);
      return next;
    });
  }

  function selectAllVisible() {
    const next = new Set(selected);
    for (const p of filtered) {
      const key = p.key;
      if (key && existingKeys.includes(key)) continue;
      next.add(p.family);
    }
    setSelected(next);
  }

  function selectNone() {
    setSelected(new Set());
  }

  async function submit() {
    setImporting(true);
    setError(null);

    try {
      const res = await fetch("/api/font-families/import-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ families: Array.from(selected) }),
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? "Import failed");
      }

      onImported();
      onOpenChange(false);
      setSelected(new Set());
      setSearch("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImporting(false);
    }
  }

  const categories = ["all", "sans", "serif", "mono", "display", "handwriting"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Import from Google Fonts</DialogTitle>
          <DialogDescription>
            Select fonts to add to your library. {GOOGLE_FONTS_PRESETS.length}{" "}
            presets available.
          </DialogDescription>
        </DialogHeader>

        {/* Search + Filter */}
        <div className="flex flex-wrap items-center gap-2 border-b px-6 py-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs capitalize transition-colors",
                  filterCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-accent",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-b px-6 py-2 text-xs">
          <span className="text-muted-foreground">
            {selected.size} selected • {filtered.length} visible
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={selectAllVisible}
            >
              Select all
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={selectNone}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[50vh] overflow-y-auto px-6 py-3">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No fonts match your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((preset) => {
                const key = preset.key;
                const isExisting = Boolean(key && existingKeys.includes(key));
                const isSelected = selected.has(preset.family);

                return (
                  <button
                    key={preset.family}
                    type="button"
                    disabled={isExisting}
                    onClick={() => toggle(preset.family)}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                      isExisting
                        ? "opacity-50 cursor-not-allowed"
                        : isSelected
                          ? "border-primary bg-primary/5"
                          : "hover:bg-accent",
                    )}
                  >
                    <Checkbox
                      checked={isSelected || !!isExisting}
                      disabled={isExisting}
                      className="mt-0.5"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-medium truncate"
                          style={{
                            fontFamily: `"${preset.family}", sans-serif`,
                          }}
                        >
                          {preset.family}
                        </span>
                        {isExisting && (
                          <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Badge
                          variant="secondary"
                          className="text-[10px] capitalize"
                        >
                          {preset.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {preset.weights.length} weights
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Error */}
        {error ? (
          <div className="border-t border-destructive/30 bg-destructive/10 px-6 py-2 text-xs text-destructive">
            {error}
          </div>
        ) : null}

        {/* Footer */}
        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={importing}
          >
            Cancel
          </Button>
          <Button onClick={submit} disabled={importing || selected.size === 0}>
            {importing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Import {selected.size} font{selected.size !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
