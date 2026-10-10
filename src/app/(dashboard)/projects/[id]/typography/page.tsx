"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Type, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { IFontFamily } from "@/models/FontFamily";
import type { IFontSize } from "@/models/FontSize";
import type { IFontWeight } from "@/models/FontWeight";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface DSTypography {
  families: {
    sans?: IFontFamily;
    serif?: IFontFamily;
    mono?: IFontFamily;
    display?: IFontFamily;
    handwriting?: IFontFamily;
  };
  sizes: IFontSize[];
  weights: IFontWeight[];
}

/* =====================================================================
   Page
   ===================================================================== */

export default function ProjectTypographyPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [allFonts, setAllFonts] = useState<IFontFamily[]>([]);
  const [allSizes, setAllSizes] = useState<IFontSize[]>([]);
  const [allWeights, setAllWeights] = useState<IFontWeight[]>([]);

  const [sans, setSans] = useState<string>("");
  const [serif, setSerif] = useState<string>("");
  const [mono, setMono] = useState<string>("");
  const [display, setDisplay] = useState<string>("");
  const [handwriting, setHandwriting] = useState<string>("");

  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedWeights, setSelectedWeights] = useState<Set<string>>(new Set());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  /* --------------------------- Load --------------------------- */

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dsRes, fontsRes, sizesRes, weightsRes] = await Promise.all([
        fetch(`/api/projects/${id}/design-system/typography`),
        fetch("/api/font-families"),
        fetch("/api/font-sizes"),
        fetch("/api/font-weights"),
      ]);

      const [dsJson, fontsJson, sizesJson, weightsJson] = await Promise.all([
        dsRes.json(),
        fontsRes.json(),
        sizesRes.json(),
        weightsRes.json(),
      ]);

      if (!dsRes.ok || !dsJson.success) {
        throw new Error(dsJson?.message ?? "Failed to load DS");
      }

      setAllFonts(fontsJson.data?.items ?? []);
      setAllSizes(sizesJson.data?.items ?? []);
      setAllWeights(weightsJson.data?.items ?? []);

      const t: DSTypography = dsJson.data?.typography ?? {
        families: {},
        sizes: [],
        weights: [],
      };

setSans(t.families?.sans?._id ? String(t.families.sans._id) : "");
setSerif(t.families?.serif?._id ? String(t.families.serif._id) : "");
setMono(t.families?.mono?._id ? String(t.families.mono._id) : "");
setDisplay(t.families?.display?._id ? String(t.families.display._id) : "");
setHandwriting(t.families?.handwriting?._id ? String(t.families.handwriting._id) : "");

setSelectedSizes(new Set((t.sizes ?? []).map(s => String(s._id))));
setSelectedWeights(new Set((t.weights ?? []).map(w => String(w._id))));

      setDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  /* --------------------------- Save --------------------------- */

  async function save() {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/projects/${id}/design-system/typography`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          families: {
            sans: sans || null,
            serif: serif || null,
            mono: mono || null,
            display: display || null,
            handwriting: handwriting || null,
          },
          sizes: Array.from(selectedSizes),
          weights: Array.from(selectedWeights),
        }),
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? "Save failed");
      }

      setDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  /* --------------------------- Toggle ------------------------- */

  function toggleSize(id: string) {
    setSelectedSizes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setDirty(true);
  }

  function toggleWeight(id: string) {
    setSelectedWeights(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setDirty(true);
  }

function selectAllSizes() {
  setSelectedSizes(new Set(allSizes.map(s => String(s._id))));
  setDirty(true);
}

function selectAllWeights() {
  setSelectedWeights(new Set(allWeights.map(w => String(w._id))));
  setDirty(true);
}

  function clearSizes() {
    setSelectedSizes(new Set());
    setDirty(true);
  }


  function clearWeights() {
    setSelectedWeights(new Set());
    setDirty(true);
  }

  /* --------------------------- Render ------------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && !allFonts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(`/projects/${id}`)}
        >
          Back to Project
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-32">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/projects/${id}?tab=frontend`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Typography Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose fonts, sizes, and weights for this project
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="families" className="w-full">
        <TabsList>
          <TabsTrigger value="families">Font Families</TabsTrigger>
          <TabsTrigger value="sizes">Font Sizes</TabsTrigger>
          <TabsTrigger value="weights">Font Weights</TabsTrigger>
        </TabsList>

        {/* Families */}
        <TabsContent value="families" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Type className="h-4 w-4 text-primary" />
                Font Roles
              </CardTitle>
              <CardDescription>
                Assign fonts to semantic roles (sans, serif, mono, ...)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FontRoleSelect
                label="Sans Serif"
                description="Default body font"
                value={sans}
                onChange={v => {
                  setSans(v);
                  setDirty(true);
                }}
                fonts={allFonts}
              />
              <FontRoleSelect
                label="Serif"
                description="Headings, quotes"
                value={serif}
                onChange={v => {
                  setSerif(v);
                  setDirty(true);
                }}
                fonts={allFonts}
              />
              <FontRoleSelect
                label="Monospace"
                description="Code, tabs"
                value={mono}
                onChange={v => {
                  setMono(v);
                  setDirty(true);
                }}
                fonts={allFonts}
              />
              <FontRoleSelect
                label="Display"
                description="Large headings (optional)"
                value={display}
                onChange={v => {
                  setDisplay(v);
                  setDirty(true);
                }}
                fonts={allFonts}
              />
              <FontRoleSelect
                label="Handwriting"
                description="Decorative (optional)"
                value={handwriting}
                onChange={v => {
                  setHandwriting(v);
                  setDirty(true);
                }}
                fonts={allFonts}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sizes */}
        <TabsContent value="sizes" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">
                  Font Sizes ({selectedSizes.size} / {allSizes.length})
                </CardTitle>
                <CardDescription>Pick the sizes to include</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllSizes}>
                  All
                </Button>
                <Button variant="outline" size="sm" onClick={clearSizes}>
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {allSizes.length === 0 ? (
                <EmptyState
                  message="No font sizes in library."
                  actionLabel="Go to Typography"
                  href="/typography"
                />
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {allSizes.map(s => (
                    <SizeCard
                      key={String(s._id)}
                      size={s}
                      checked={selectedSizes.has(String(s._id))}
                      onToggle={() => toggleSize(String(s._id))}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weights */}
        <TabsContent value="weights" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">
                  Font Weights ({selectedWeights.size} / {allWeights.length})
                </CardTitle>
                <CardDescription>Pick the weights to include</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllWeights}>
                  All
                </Button>
                <Button variant="outline" size="sm" onClick={clearWeights}>
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {allWeights.length === 0 ? (
                <EmptyState
                  message="No font weights in library."
                  actionLabel="Go to Typography"
                  href="/typography"
                />
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {allWeights.map(w => (
                    <WeightCard
                      key={String(w._id)}
                      weight={w}
                      checked={selectedWeights.has(String(w._id))}
                      onToggle={() => toggleWeight(String(w._id))}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sticky save */}
      <div className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-2xl border bg-background/95 p-3 shadow-lg backdrop-blur">
          {error ? (
            <div className="flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{error}</span>
            </div>
          ) : dirty ? (
            <span className="text-xs text-muted-foreground">
              Unsaved changes
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">Saved</span>
          )}

          <Button onClick={save} disabled={!dirty || saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   Sub-components
   ===================================================================== */
const NONE_VALUE = "__none__";

function FontRoleSelect({
  label,
  description,
  value,
  onChange,
  fonts,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (v: string) => void;
  fonts: IFontFamily[];
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="sm:w-1/3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <Select
        value={value || NONE_VALUE}
        onValueChange={v => onChange(v === NONE_VALUE ? "" : (v ?? ""))}
      >
        <SelectTrigger className="sm:w-2/3">
          <SelectValue placeholder="— None —" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={NONE_VALUE}>— None —</SelectItem>
          {fonts.map(f => (
            <SelectItem key={String(f._id)} value={String(f._id)}>
              <span style={{ fontFamily: `"${f.name}", sans-serif` }}>
                {f.name}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                ({f.category})
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
function SizeCard({
  size,
  checked,
  onToggle,
}: {
  size: IFontSize;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
        checked ? "border-primary bg-primary/5" : "hover:bg-accent"
      }`}
    >
      <Checkbox checked={checked} className="mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs">{size.key}</span>
          <Badge variant="secondary" className="text-[10px]">
            {size.value}
          </Badge>
        </div>
        <p
          className="mt-1 truncate"
          style={{ fontSize: size.value, lineHeight: size.lineHeight }}
        >
          {size.name}
        </p>
      </div>
    </button>
  );
}

function WeightCard({
  weight,
  checked,
  onToggle,
}: {
  weight: IFontWeight;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
        checked ? "border-primary bg-primary/5" : "hover:bg-accent"
      }`}
    >
      <Checkbox checked={checked} className="mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs">{weight.key}</span>
          <Badge variant="secondary" className="text-[10px]">
            {weight.value}
          </Badge>
        </div>
        <p className="mt-1 truncate" style={{ fontWeight: weight.value }}>
          {weight.name}
        </p>
      </div>
    </button>
  );
}



function EmptyState({
  message,
  actionLabel,
  href,
}: {
  message: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button className="mt-3" size="sm" asChild>
        <a href={href}>{actionLabel}</a>
      </Button>
    </div>
  );
}