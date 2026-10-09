"use client";
import { DuplicateThemeDialog } from "./duplicate-theme-dialog";
import { Copy, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Palette, ExternalLink } from "lucide-react";
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

export interface ThemeRow {
  _id: string;
  key: string;
  name: string;
  description?: string;
  values?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

interface ThemesTableProps {
  themes: ThemeRow[];
  onDeleted?: () => void;
}

export function ThemesTable({ themes, onDeleted }: ThemesTableProps) {
  const router = useRouter();
  const [toDelete, setToDelete] = useState<ThemeRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toDuplicate, setToDuplicate] = useState<ThemeRow | null>(null);
  function handleRowClick(id: string) {
    router.push(`/themes/${id}`);
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/themes/${toDelete._id}`, {
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

  if (!themes.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <Palette className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No themes yet. Create your first one above.
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
              <TableHead className="w-35">Key</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center w-25">Values</TableHead>
              <TableHead className="text-right w-35">Created</TableHead>
              <TableHead className="w-15"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map((theme) => {
              const valueCount = theme.values
                ? Object.keys(theme.values).length
                : 0;

              return (
                <TableRow
                  key={theme._id}
                  className="group cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(theme._id)}
                >
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {theme.key}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-medium">
                    <span className="flex items-center gap-1.5">
                      {theme.name}
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </TableCell>

                  <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                    {theme.description || "—"}
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{valueCount}</span>
                  </TableCell>

                  <TableCell className="text-right text-xs text-muted-foreground">
                    {formatDate(theme.createdAt)}
                  </TableCell>

                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                    className="text-right"
                  >
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className="text-right"
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setToDuplicate(theme)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setToDelete(theme)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setToDelete(theme)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!toDelete}
        onOpenChange={(open) => !open && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete theme?</AlertDialogTitle>
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
              onClick={(e) => {
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
      <DuplicateThemeDialog
  open={!!toDuplicate}
  onOpenChange={open => !open && setToDuplicate(null)}
  sourceTheme={
    toDuplicate
      ? {
          _id: toDuplicate._id,
          key: toDuplicate.key,
          name: toDuplicate.name,
        }
      : null
  }
  onDuplicated={() => {
    onDeleted?.(); // یعنی reload
  }}
/>
    </>
  );
}

function formatDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
