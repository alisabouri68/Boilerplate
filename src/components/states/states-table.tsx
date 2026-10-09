"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Layers, Copy, MoreHorizontal } from "lucide-react";
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
  DropdownMenuSeparator,
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
import { DuplicateDialog } from "@/components/shared/duplicate-dialog";

export interface StateRow {
  _id: string;
  key: string;
  name: string;
  description?: string;
  order: number;
  createdAt?: string;
}

interface StatesTableProps {
  states: StateRow[];
  onDeleted?: () => void;
}

export function StatesTable({ states, onDeleted }: StatesTableProps) {
  const [toDelete, setToDelete] = useState<StateRow | null>(null);
  const [toDuplicate, setToDuplicate] = useState<StateRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/states/${toDelete._id}`, {
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

  if (!states.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <Layers className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No states yet. Create your first one above.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">Order</TableHead>
              <TableHead className="w-[140px]">Key</TableHead>
              <TableHead className="w-[180px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {states.map(s => (
              <TableRow key={s._id}>
                <TableCell className="text-center">
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {s.order}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {s.key}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                  {s.description || "—"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setToDuplicate(s)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setToDelete(s)}
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

      {/* Delete confirm */}
      <AlertDialog
        open={!!toDelete}
        onOpenChange={open => !open && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete state?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{toDelete?.name}</strong> ({toDelete?.key}). This cannot be
              undone.
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

      {/* Duplicate dialog */}
      <DuplicateDialog
        open={!!toDuplicate}
        onOpenChange={open => !open && setToDuplicate(null)}
        resourceName="State"
        source={
          toDuplicate
            ? {
                _id: toDuplicate._id,
                key: toDuplicate.key,
                name: toDuplicate.name,
              }
            : null
        }
        apiBase="/api/states"
        onDuplicated={() => onDeleted?.()}
      />
    </>
  );
}