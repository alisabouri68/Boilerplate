"use client";

import { useState } from "react";
import { Trash2, Loader2, Type, MoreHorizontal } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export interface FontFamilyRow {
  _id: string;
  key: string;
  name: string;
  category: string;
  description?: string;
  source: string;
  googleFamily?: string;
  weights: number[];
  styles: string[];
  subsets: string[];
}

interface FontFamiliesTableProps {
  fonts: FontFamilyRow[];
  onDeleted?: () => void;
}

export function FontFamiliesTable({
  fonts,
  onDeleted,
}: FontFamiliesTableProps) {
  const [toDelete, setToDelete] = useState<FontFamilyRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/font-families/${toDelete._id}`, {
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

  if (!fonts.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <Type className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No fonts yet. Add one above or import from Google Fonts.
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
              <TableHead className="w-[180px]">Preview</TableHead>
              <TableHead className="w-[140px]">Key</TableHead>
              <TableHead className="w-[160px]">Name</TableHead>
              <TableHead className="w-[100px]">Category</TableHead>
              <TableHead className="w-[100px]">Source</TableHead>
              <TableHead className="w-[120px]">Weights</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fonts.map(f => (
              <TableRow key={f._id}>
                <TableCell>
                  <div
                    className="text-lg"
                    style={{
                      fontFamily: `"${f.name}", sans-serif`,
                    }}
                  >
                    Aa Bb Cc ۱۲۳
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {f.key}
                  </Badge>
                </TableCell>

                <TableCell className="font-medium">{f.name}</TableCell>

                <TableCell>
                  <Badge variant="secondary" className="capitalize text-[10px]">
                    {f.category}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="capitalize text-[10px]">
                    {f.source}
                  </Badge>
                </TableCell>

                <TableCell>
                  <span className="text-xs text-muted-foreground">
                    {f.weights.length} (
                    {f.weights[0]}–{f.weights[f.weights.length - 1]})
                  </span>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setToDelete(f)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            <AlertDialogTitle>Delete font?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{toDelete?.name}</strong>. This cannot be undone.
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