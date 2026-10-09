"use client";

import { useState } from "react";
import { Trash2, Loader2, Type } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 as Spinner } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface FontSizeRow {
  _id: string;
  key: string;
  name: string;
  value: string;
  lineHeight?: string;
  letterSpacing?: string;
  order: number;
}

interface FontSizesTableProps {
  sizes: FontSizeRow[];
  onRefresh?: () => void;
}

export function FontSizesTable({ sizes, onRefresh }: FontSizesTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/font-sizes/${id}`, { method: "DELETE" });
      onRefresh?.();
    } finally {
      setDeletingId(null);
    }
  }

  if (!sizes.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <Type className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No sizes yet. Add one or load Tailwind defaults.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">Order</TableHead>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead className="w-[160px]">Name</TableHead>
            <TableHead className="w-[120px]">Value</TableHead>
            <TableHead className="w-[120px]">Line Height</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizes.map(s => (
            <TableRow key={s._id}>
              <TableCell className="text-center">
                <span className="text-xs tabular-nums text-muted-foreground">
                  {s.order}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono text-xs">
                  {s.key}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{s.name}</TableCell>
              <TableCell>
                <span className="font-mono text-xs">{s.value}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs text-muted-foreground">
                  {s.lineHeight ?? "—"}
                </span>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    fontSize: s.value,
                    lineHeight: s.lineHeight,
                  }}
                >
                  The quick brown fox
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(s._id)}
                  disabled={deletingId === s._id}
                >
                  {deletingId === s._id ? (
                    <Spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}