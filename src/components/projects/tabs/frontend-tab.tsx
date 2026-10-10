"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Download, Loader2, Plus, Palette, Sparkles, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateDesignSystemDialog } from "@/components/projects/create-design-system-dialog";
import { ExportDesignSystemDialog } from "@/components/projects/export-design-system-dialog";
import type { DesignSystemData } from "@/lib/export/design-system-export";
import type { IProject } from "@/models/Project";
import type { IDesignSystem } from "@/models/DesignSystem";

/* =====================================================================
   Types
   ===================================================================== */

interface FrontendTabProps {
  projectId: string;
  project: IProject;
}

interface PopulatedDS extends Omit<
  IDesignSystem,
  "states" | "tokens" | "palettes"
> {
  states: Array<{ _id: string; key: string; name: string }>;
  tokens: Array<{ _id: string; key: string; name: string; scope: string }>;
  palettes: Array<{ _id: string; key: string; name: string }>;
}

/* =====================================================================
   Component
   ===================================================================== */

export function FrontendTab({ projectId, project }: FrontendTabProps) {
  const [ds, setDs] = useState<PopulatedDS | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const [exportOpen, setExportOpen] = useState(false);
  const [exportData, setExportData] = useState<DesignSystemData | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

  /* --------------------------- Load DS --------------------------- */

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/design-system`);
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? `Failed (${res.status})`);
      }

      setDs(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    load();
  }, [load]);

  /* ------------------------- Open Export ------------------------- */

  async function openExport() {
    setExportLoading(true);
    try {
      const res = await fetch(
        `/api/projects/${projectId}/design-system/export`,
      );
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok || !json.success) {
        throw new Error(json?.message ?? "Failed to load export data");
      }

      const dsData = json.data;

      const themes = (dsData.themes ?? []).map(
        (t: {
          key: string;
          name: string;
          description?: string;
          isDefault: boolean;
          values?: Record<string, string>;
        }) => ({
          key: t.key,
          name: t.name,
          description: t.description,
          isDefault: t.isDefault,
          values: t.values ?? {},
        }),
      );
setExportData({
  name: dsData.name,
  description: dsData.description,
  themes,
  palettes: dsData.palettes ?? [],
  typography: dsData.typography,   // ← این خط اضافه
});
      setExportOpen(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExportLoading(false);
    }
  }

  /* --------------------------- Render ---------------------------- */

  return (
    <div className="flex flex-col gap-6">
      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Frontend Tech Stack</CardTitle>
          <CardDescription>
            Frameworks and libraries used in this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {project.techStack?.frontend?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.frontend.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No tech selected</p>
          )}
        </CardContent>
      </Card>

      {/* Design System header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Design System</h2>
          <p className="text-sm text-muted-foreground">
            Themes, colors, and tokens for this project
          </p>
        </div>

        <div className="flex items-center gap-2">
          {ds && (
            <Button
              variant="outline"
              onClick={openExport}
              disabled={exportLoading}
            >
              {exportLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export All
                </>
              )}
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}/typography`}>
              <Type className="mr-2 h-4 w-4" />
              Typography
            </Link>
          </Button>
          {!ds && (
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Design System
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center rounded-lg border py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : !ds ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <Palette className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No design system yet.</p>
          <Button className="mt-4" onClick={() => setCreateOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Create from Library
          </Button>
        </div>
      ) : (
        <DesignSystemOverview ds={ds} projectId={projectId} />
      )}

      {/* Dialogs */}
      <CreateDesignSystemDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        projectId={projectId}
        onCreated={load}
      />

      {exportData && (
        <ExportDesignSystemDialog
          open={exportOpen}
          onOpenChange={setExportOpen}
          data={exportData}
        />
      )}
    </div>
  );
}

/* =====================================================================
   Design System Overview
   ===================================================================== */

function DesignSystemOverview({
  ds,
  projectId,
}: {
  ds: PopulatedDS;
  projectId: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Themes ({ds.themes.length})
          </CardTitle>
          <CardDescription>
            Each theme has its own values for states and tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {ds.themes.map((t) => {
            const valueCount = t.values ? Object.keys(t.values).length : 0;

            return (
              <Link
                key={t.key}
                href={`/themes/by-key/${t.key}`}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="font-medium">
                    {t.name}
                    {t.isDefault && (
                      <Badge variant="secondary" className="ml-2 text-[10px]">
                        Default
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {t.key}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {valueCount} values
                </span>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Library</CardTitle>
            <CardDescription>Global definitions attached</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <Stat label="States" value={ds.states.length} />
            <Stat label="Tokens" value={ds.tokens.length} />
            <Stat label="Palettes" value={ds.palettes.length} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Palettes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {ds.palettes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No palettes linked.
              </p>
            ) : (
              ds.palettes.map((p) => (
                <Badge
                  key={p._id}
                  variant="outline"
                  className="font-mono text-xs"
                >
                  {p.key}
                </Badge>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
