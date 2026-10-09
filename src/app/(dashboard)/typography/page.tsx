"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontFamilyForm } from "@/components/typography/font-family-form";
import {
  FontFamiliesTable,
  type FontFamilyRow,
} from "@/components/typography/font-families-table";
import { ImportGoogleDialog } from "@/components/typography/import-google-dialog";
import { FontSizeForm } from "@/components/typography/font-size-form";
import {
  FontSizesTable,
  type FontSizeRow,
} from "@/components/typography/font-sizes-table";
import { FontWeightForm } from "@/components/typography/font-weight-form";
import {
  FontWeightsTable,
  type FontWeightRow,
} from "@/components/typography/font-weights-table";

type Tab = "families" | "sizes" | "weights";

export default function TypographyPage() {
  const [tab, setTab] = useState<Tab>("families");
  const [fonts, setFonts] = useState<FontFamilyRow[]>([]);
  const [sizes, setSizes] = useState<FontSizeRow[]>([]);
  const [weights, setWeights] = useState<FontWeightRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [importOpen, setImportOpen] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [fontsRes, sizesRes, weightsRes] = await Promise.all([
        fetch("/api/font-families"),
        fetch("/api/font-sizes"),
        fetch("/api/font-weights"),
      ]);

      const [fontsJson, sizesJson, weightsJson] = await Promise.all([
        fontsRes.json(),
        sizesRes.json(),
        weightsRes.json(),
      ]);

      setFonts(fontsJson.data?.items ?? []);
      setSizes(sizesJson.data?.items ?? []);
      setWeights(weightsJson.data?.items ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const existingKeys = useMemo(() => fonts.map(f => f.key), [fonts]);

  async function loadPreset(type: "tailwind" | "standard") {
    setLoadingPreset(true);
    try {
      const endpoint = type === "tailwind" ? "/api/font-sizes" : "/api/font-weights";
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preset: type }),
      });
      await loadAll();
    } finally {
      setLoadingPreset(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Typography</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Font families, sizes, and weights for your design system.
          </p>
        </div>

        {tab === "families" && (
          <Button variant="outline" onClick={() => setImportOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Import from Google
          </Button>
        )}
      </header>

      <Tabs value={tab} onValueChange={v => setTab(v as Tab)} className="w-full">
        <TabsList>
          <TabsTrigger value="families">Families</TabsTrigger>
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
          <TabsTrigger value="weights">Weights</TabsTrigger>
        </TabsList>

        {/* Families */}
        <TabsContent value="families" className="mt-4 flex flex-col gap-6">
          <FontFamilyForm onCreated={loadAll} />

          {loading ? (
            <div className="flex items-center justify-center rounded-lg border py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <FontFamiliesTable fonts={fonts} onDeleted={loadAll} />
          )}
        </TabsContent>

        {/* Sizes */}
        <TabsContent value="sizes" className="mt-4 flex flex-col gap-6">
          <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
            <div>
              <p className="text-sm font-medium">Font Sizes</p>
              <p className="text-xs text-muted-foreground">
                {sizes.length} size{sizes.length !== 1 ? "s" : ""} defined
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset("tailwind")}
              disabled={loadingPreset}
            >
              {loadingPreset ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="mr-2 h-3.5 w-3.5" />
              )}
              Load Tailwind Default
            </Button>
          </div>

          <FontSizeForm onCreated={loadAll} />

          {loading ? (
            <div className="flex items-center justify-center rounded-lg border py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <FontSizesTable sizes={sizes} onRefresh={loadAll} />
          )}
        </TabsContent>

        {/* Weights */}
        <TabsContent value="weights" className="mt-4 flex flex-col gap-6">
          <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
            <div>
              <p className="text-sm font-medium">Font Weights</p>
              <p className="text-xs text-muted-foreground">
                {weights.length} weight{weights.length !== 1 ? "s" : ""} defined
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadPreset("standard")}
              disabled={loadingPreset}
            >
              {loadingPreset ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="mr-2 h-3.5 w-3.5" />
              )}
              Load Standard Weights
            </Button>
          </div>

          <FontWeightForm onCreated={loadAll} />

          {loading ? (
            <div className="flex items-center justify-center rounded-lg border py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <FontWeightsTable weights={weights} onRefresh={loadAll} />
          )}
        </TabsContent>
      </Tabs>

      <ImportGoogleDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        existingKeys={existingKeys}
        onImported={loadAll}
      />
    </div>
  );
}