"use client";

import { useState } from "react";
import { Trash2, Loader2, Tag } from "lucide-react";
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

export interface TokenRow {
  _id: string;
  key: string;
  name: string;
  description?: string;
  scope: "state" | "theme";
  type: string;
  order: number;
  createdAt?: string;
}

interface TokensTableProps {
  tokens: TokenRow[];
  onDeleted?: () => void;
}

export function TokensTable({ tokens, onDeleted }: TokensTableProps) {
  const [toDelete, setToDelete] = useState<TokenRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/tokens/${toDelete._id}`, {
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

  const stateScoped = tokens.filter(t => t.scope === "state");
  const themeScoped = tokens.filter(t => t.scope === "theme");

  if (!tokens.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <Tag className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No tokens yet. Create your first one above.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {stateScoped.length > 0 && (
          <TokenGroup
            title="State-scoped tokens"
            description="Each token × each state = a value key (e.g. bg-brand, text-success)"
            items={stateScoped}
            onDelete={setToDelete}
          />
        )}

        {themeScoped.length > 0 && (
          <TokenGroup
            title="Theme-scoped tokens"
            description="One value per theme (e.g. color-accent, color-odd)"
            items={themeScoped}
            onDelete={setToDelete}
          />
        )}
      </div>

      <AlertDialog
        open={!!toDelete}
        onOpenChange={open => !open && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete token?</AlertDialogTitle>
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

/* ------------------------------ Group ------------------------------ */

function TokenGroup({
  title,
  description,
  items,
  onDelete,
}: {
  title: string;
  description: string;
  items: TokenRow[];
  onDelete: (t: TokenRow) => void;
}) {
  return (
    <section className="flex flex-col gap-2">
      <header className="flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {items.length}
        </Badge>
      </header>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">Order</TableHead>
              <TableHead className="w-[180px]">Key</TableHead>
              <TableHead className="w-[180px]">Name</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(t => (
              <TableRow key={t._id}>
                <TableCell className="text-center">
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {t.order}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {t.key}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {t.type}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                  {t.description || "—"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(t)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}