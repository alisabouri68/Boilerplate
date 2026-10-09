"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  LayoutDashboard,
  Monitor,
  Server,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FrontendTab } from "@/components/projects/tabs/frontend-tab";
import { BackendTab } from "@/components/projects/tabs/backend-tab";
import { DatabaseTab } from "@/components/projects/tabs/database-tab";
import { OverviewTab } from "@/components/projects/tabs/overview-tab";
import { cn } from "@/lib/utils";
import type { IProject } from "@/models/Project";

interface PageProps {
  params: Promise<{ id: string }>;
}

const tabTriggerClass = cn(
  "flex-1 flex items-center justify-center gap-2 rounded-none px-4 py-3",
  "text-sm font-medium text-muted-foreground bg-transparent",
  "border-b-2 border-transparent -mb-px",
  "transition-colors hover:text-foreground",
  "data-[state=active]:border-primary data-[state=active]:text-foreground",
  "data-[state=active]:bg-transparent data-[state=active]:shadow-none"
);

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/projects/${id}`);
        const text = await res.text();
        const json = text ? JSON.parse(text) : {};

        if (!res.ok || !json.success) {
          throw new Error(json?.message ?? `Failed (${res.status})`);
        }

        if (cancelled) return;
        setProject(json.data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive">{error ?? "Not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b bg-background px-6 py-5">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mt-0.5 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-2xl font-bold tracking-tight">
                {project.name}
              </h1>
              <Badge variant="outline" className="capitalize shrink-0">
                {project.type}
              </Badge>
              <Badge variant="secondary" className="capitalize shrink-0">
                {project.status}
              </Badge>
            </div>
            {project.description && (
              <p className="mt-1.5 max-w-3xl text-sm text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="flex w-full flex-col">
        <div className="border-b bg-background">
          <TabsList className="flex h-auto w-full justify-start gap-0 rounded-none bg-transparent p-0">
            <TabsTrigger value="overview" className={tabTriggerClass}>
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="frontend" className={tabTriggerClass}>
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Frontend</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className={tabTriggerClass}>
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Backend</span>
            </TabsTrigger>
            <TabsTrigger value="database" className={tabTriggerClass}>
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Database</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="px-6 py-6">
          <TabsContent value="overview" className="mt-0">
            <OverviewTab project={project} />
          </TabsContent>
          <TabsContent value="frontend" className="mt-0">
            <FrontendTab projectId={id} project={project} />
          </TabsContent>
          <TabsContent value="backend" className="mt-0">
            <BackendTab project={project} />
          </TabsContent>
          <TabsContent value="database" className="mt-0">
            <DatabaseTab project={project} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}