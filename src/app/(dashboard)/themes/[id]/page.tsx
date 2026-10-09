"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  AlertCircle,
  Palette,
  ExternalLink,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeValuesGrid } from "@/components/themes/theme-values-grid";
import { ExportThemeDialog } from "@/components/themes/export-theme-dialog";
import { LivePreviewPanel } from "@/components/themes/live-preview-panel";
import { FullPreview } from "@/components/themes/full-preview";
import type { IState } from "@/models/State";
import type { IToken } from "@/models/Token";
import type { IColorPalette } from "@/models/ColorPalette";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ThemeAPI {
  _id: string;
  key: string;
  name: string;
  description?: string;
  values: Record<string, string>;
}

export default function ThemeEditorPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [theme, setTheme] = useState<ThemeAPI | null>(null);
  const [states, setStates] = useState<IState[]>([]);
  const [tokens, setTokens] = useState<IToken[]>([]);
  const [palettes, setPalettes] = useState<IColorPalette[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const [values, setValues] = useState<Record<string, string>>({});
  const [exportOpen, setExportOpen] = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);

  /* --------------------------- Load --------------------------- */

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [themeRes, statesRes, tokensRes, palettesRes] = await Promise.all([
        fetch(`/api/themes/${id}`),
        fetch("/api/states"),
        fetch("/api/tokens"),
        fetch("/api/palettes"),
      ]);

      const themeJson = await themeRes.json();
      const statesJson = await statesRes.json();
      const tokensJson = await tokensRes.json();
      const palettesJson = await palettesRes.json();

      if (!themeRes.ok || !themeJson.success) {
        throw new Error(themeJson?.message ?? "Theme not found");
      }

      setTheme(themeJson.data);
      setValues(themeJson.data.values ?? {});
      setStates(statesJson.data?.items ?? []);
      setTokens(tokensJson.data?.items ?? []);
      setPalettes(palettesJson.data?.items ?? []);
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
      const res = await fetch(`/api/themes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
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

  /* ------------------------ Split tokens ---------------------- */

  const stateTokens = useMemo(
    () => tokens.filter(t => t.scope === "state"),
    [tokens]
  );
  const themeTokens = useMemo(
    () => tokens.filter(t => t.scope === "theme"),
    [tokens]
  );

  /* --------------------------- Render ------------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !theme) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive">{error ?? "Not found"}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/themes")}
        >
          Back to Themes
        </Button>
      </div>
    );
  }

  const filledCount = Object.values(values).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6 pb-32">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/themes")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {theme.name}
            </h1>
            <Badge variant="outline" className="font-mono text-xs">
              {theme.key}
            </Badge>
          </div>
          {theme.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {theme.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setLiveOpen(o => !o)}
          >
            {liveOpen ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Live Preview
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">States:</span>
            <span className="font-medium">{states.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">State tokens:</span>
            <span className="font-medium">{stateTokens.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Theme tokens:</span>
            <span className="font-medium">{themeTokens.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Filled:</span>
            <span className="font-medium">{filledCount}</span>
          </div>
        </div>

        <Link
          href="/palettes"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Manage Palettes <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* Main area with optional live preview */}
      <div className={liveOpen ? "grid grid-cols-1 gap-6 lg:grid-cols-2" : ""}>
        {/* Editor side */}
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Full Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="mt-4 flex flex-col gap-6">
              {stateTokens.length > 0 && states.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Palette className="h-4 w-4 text-primary" />
                      State Tokens
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Every state token × every state = a value
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ThemeValuesGrid
                      tokens={stateTokens}
                      states={states}
                      palettes={palettes}
                      values={values}
                      onChange={patch => {
                        setValues(v => ({ ...v, ...patch }));
                        setDirty(true);
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {themeTokens.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Palette className="h-4 w-4 text-primary" />
                      Theme Tokens
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Not tied to a state — one value per theme
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ThemeValuesGrid
                      tokens={themeTokens}
                      states={[]}
                      palettes={palettes}
                      values={values}
                      onChange={patch => {
                        setValues(v => ({ ...v, ...patch }));
                        setDirty(true);
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <FullPreview values={values} palettes={palettes} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Live preview panel */}
        {liveOpen && (
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-180px)]">
            <LivePreviewPanel
              values={values}
              palettes={palettes}
              onClose={() => setLiveOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Sticky save bar */}
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

      {/* Export dialog */}
      <ExportThemeDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        theme={{ key: theme.key, name: theme.name, values }}
        palettes={palettes}
      />
    </div>
  );
}