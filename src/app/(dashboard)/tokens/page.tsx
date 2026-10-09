"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { TokenForm } from "@/components/tokens/token-form";
import { TokensTable, type TokenRow } from "@/components/tokens/tokens-table";

export default function TokensPage() {
  const [tokens, setTokens] = useState<TokenRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tokens");
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? `Failed (${res.status})`);
      }

      setTokens(json.data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Tokens</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Define token keys. Values are set inside each theme.
        </p>
      </header>

      <TokenForm onCreated={load} />

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : (
        <TokensTable tokens={tokens} onDeleted={load} />
      )}
    </div>
  );
}