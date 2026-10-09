"use client";

import { useEffect, useState } from "react";
import { Loader2, Copy, AlertCircle } from "lucide-react";
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
import { Label } from "@/components/ui/label";

export interface DuplicateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** نام منبع (مثلاً "Palette", "State", "Theme") */
  resourceName: string;
  /** آیتم منبع */
  source: { _id: string; key: string; name: string } | null;
  /** پیشوند URL برای API — مثلاً "/api/palettes" */
  apiBase: string;
  /** callback بعد از موفقیت */
  onDuplicated: () => void;
}

export function DuplicateDialog({
  open,
  onOpenChange,
  resourceName,
  source,
  apiBase,
  onDuplicated,
}: DuplicateDialogProps) {
  const [newKey, setNewKey] = useState("");
  const [newName, setNewName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (source && open) {
      setNewKey(`${source.key}-copy`);
      setNewName(`${source.name} Copy`);
      setError(null);
    }
  }, [source, open]);

  async function submit() {
    if (!source) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${apiBase}/${source._id}/duplicate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newKey, name: newName }),
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? "Duplicate failed");
      }

      onDuplicated();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Duplicate failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Duplicate {resourceName}
          </DialogTitle>
          <DialogDescription>
            Create a copy of <strong>{source?.name}</strong> with the same
            content.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-key">New Key</Label>
            <Input
              id="new-key"
              dir="ltr"
              value={newKey}
              onChange={e => setNewKey(e.target.value)}
              placeholder={`e.g. ${source?.key ?? "name"}-copy`}
            />
            <p className="text-xs text-muted-foreground">
              Lowercase, unique, dashes allowed
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-name">New Name</Label>
            <Input
              id="new-name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder={`e.g. ${source?.name ?? "Name"} Copy`}
            />
          </div>

          {error ? (
            <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={submit} disabled={submitting || !newKey || !newName}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Duplicating...
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}