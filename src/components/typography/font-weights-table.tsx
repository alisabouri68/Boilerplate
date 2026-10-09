"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface FontWeightRow {
  _id: string;
  key: string;
  name: string;
  value: number;
  order: number;
}

interface FontWeightsTableProps {
  weights: FontWeightRow[];
  onRefresh?: () => void;
}

export function FontWeightsTable({ weights, onRefresh }: FontWeightsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/font-weights/${id}`, { method: "DELETE" });
      onRefresh?.();
    } finally {
      setDeletingId(null);
    }
  }

  if (!weights.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <p className="text-sm text-muted-foreground">
          No weights yet. Load standard weights or add manually.
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
            <TableHead className="w-[140px]">Key</TableHead>
            <TableHead className="w-[180px]">Name</TableHead>
            <TableHead className="w-[100px]">Value</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weights.map(w => (
            <TableRow key={w._id}>
              <TableCell className="text-center">
                <span className="text-xs tabular-nums text-muted-foreground">{w.order}</span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono text-xs">{w.key}</Badge>
              </TableCell>
              <TableCell className="font-medium">{w.name}</TableCell>
              <TableCell>
                <span className="font-mono text-xs">{w.value}</span>
              </TableCell>
              <TableCell>
                <span style={{ fontWeight: w.value }}>The quick brown fox</span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost" size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(w._id)}
                  disabled={deletingId === w._id}
                >
                  {deletingId === w._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
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