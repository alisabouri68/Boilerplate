"use client";

import { useState } from "react";
import { Trash2, Loader2, Palette as PaletteIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SHADE_KEYS, type ShadeKey } from "@/lib/colors/palette-utils";

export interface PaletteRow {
  _id: string;
  key: string;
  name: string;
  description?: string;
  shades: Record<ShadeKey, string>;
  createdAt?: string;
}

interface PalettesTableProps {
  palettes: PaletteRow[];
  onDeleted?: () => void;
}

export function PalettesTable({ palettes, onDeleted }: PalettesTableProps) {
  const [toDelete, setToDelete] = useState<PaletteRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/palettes/${toDelete._id}`, {
        method: "DELETE",
      });
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? "Delete failed");
      }

      setToDelete(null);
      onDeleted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  if (!palettes.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <PaletteIcon className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No palettes yet. Create your first one above.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Key</TableHead>
              <TableHead className="w-[160px]">Name</TableHead>
              <TableHead className="min-w-[500px]">Shades</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {palettes.map(p => (
              <TableRow key={p._id}>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {p.key}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {SHADE_KEYS.map(key => {
                      const hex = p.shades?.[key];
                      return (
                        <div key={key} className="flex flex-col items-center">
                          <div
                            className="h-8 w-8 rounded border"
                            style={{ backgroundColor: hex }}
                            title={`${key}: ${hex}`}
                          />
                          <span className="mt-1 text-[10px] text-muted-foreground">
                            {key}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => setToDelete(p)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!toDelete}
        onOpenChange={open => !open && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete palette?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{toDelete?.name}</strong> (
              {toDelete?.key}). This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2 text-xs text-destructive">
              {error}
            </div>
          ) : null}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={e => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}