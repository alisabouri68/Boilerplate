"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  Palette,
  Layers,
  Tag,
  MessageSquare,
  ArrowRight,
  Loader2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* =====================================================================
   Types
   ===================================================================== */

interface Stats {
  customers: number;
  projects: number;
  palettes: number;
  states: number;
  tokens: number;
  themes: number;
}

interface RecentItem {
  _id: string;
  name: string;
  sub?: string;
}

/* =====================================================================
   Page
   ===================================================================== */

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentCustomers, setRecentCustomers] = useState<RecentItem[]>([]);
  const [recentThemes, setRecentThemes] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        customersRes,
        palettesRes,
        statesRes,
        tokensRes,
        themesRes,
      ] = await Promise.all([
        fetch("/api/customers?limit=5"),
        fetch("/api/palettes"),
        fetch("/api/states"),
        fetch("/api/tokens"),
        fetch("/api/themes"),
      ]);

      const customersJson = await customersRes.json();
      const palettesJson = await palettesRes.json();
      const statesJson = await statesRes.json();
      const tokensJson = await tokensRes.json();
      const themesJson = await themesRes.json();

      const customers = customersJson.data?.items ?? [];
      const palettes = palettesJson.data?.items ?? [];
      const states = statesJson.data?.items ?? [];
      const tokens = tokensJson.data?.items ?? [];
      const themes = themesJson.data?.items ?? [];

      // شمارش پروژه‌ها از روی customers
      const projectCount = customers.reduce(
        (acc: number, c: { projectCount?: number }) =>
          acc + (c.projectCount ?? 0),
        0
      );

      setStats({
        customers: customersJson.data?.total ?? 0,
        projects: projectCount,
        palettes: palettes.length,
        states: states.length,
        tokens: tokens.length,
        themes: themes.length,
      });

      setRecentCustomers(
        customers.slice(0, 5).map(
          (c: { _id: string; displayName?: string; type?: string }) => ({
            _id: c._id,
            name: c.displayName ?? "Unnamed",
            sub: c.type ?? undefined,
          })
        )
      );

      setRecentThemes(
        themes.slice(0, 5).map(
          (t: { _id: string; name: string; key: string }) => ({
            _id: t._id,
            name: t.name,
            sub: t.key,
          })
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        {error ?? "Failed to load dashboard"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your workspace
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label="Customers"
          value={stats.customers}
          icon={<Users className="h-4 w-4" />}
          href="/customers"
        />
        <StatCard
          label="Projects"
          value={stats.projects}
          icon={<FolderKanban className="h-4 w-4" />}
        />
        <StatCard
          label="Palettes"
          value={stats.palettes}
          icon={<Palette className="h-4 w-4" />}
          href="/palettes"
        />
        <StatCard
          label="States"
          value={stats.states}
          icon={<Layers className="h-4 w-4" />}
          href="/states"
        />
        <StatCard
          label="Tokens"
          value={stats.tokens}
          icon={<Tag className="h-4 w-4" />}
          href="/tokens"
        />
        <StatCard
          label="Themes"
          value={stats.themes}
          icon={<MessageSquare className="h-4 w-4" />}
          href="/themes"
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Customers */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Recent Customers</CardTitle>
              <CardDescription>Latest added customers</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/customers">
                View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentCustomers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No customers yet.
                </p>
                <Button className="mt-3" size="sm" asChild>
                  <Link href="/customers/new">
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Add Customer
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {recentCustomers.map(c => (
                  <Link
                    key={c._id}
                    href={`/customers/${c._id}`}
                    className="flex items-center justify-between rounded-md p-2 text-sm transition-colors hover:bg-accent"
                  >
                    <span className="font-medium truncate">{c.name}</span>
                    {c.sub && (
                      <Badge
                        variant="outline"
                        className="text-[10px] capitalize shrink-0"
                      >
                        {c.sub}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Themes */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Themes</CardTitle>
              <CardDescription>Latest themes in library</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/themes">
                View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentThemes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-muted-foreground">No themes yet.</p>
                <Button className="mt-3" size="sm" asChild>
                  <Link href="/themes">
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Create Theme
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {recentThemes.map(t => (
                  <Link
                    key={t._id}
                    href={`/themes/${t._id}`}
                    className="flex items-center justify-between rounded-md p-2 text-sm transition-colors hover:bg-accent"
                  >
                    <span className="font-medium truncate">{t.name}</span>
                    {t.sub && (
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] shrink-0"
                      >
                        {t.sub}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
          <CardDescription>Jump to common tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/customers/new">
              <Plus className="mr-2 h-4 w-4" />
              New Customer
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/themes">
              <Plus className="mr-2 h-4 w-4" />
              New Theme
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/palettes">
              <Plus className="mr-2 h-4 w-4" />
              New Palette
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tokens">
              <Plus className="mr-2 h-4 w-4" />
              New Token
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/* =====================================================================
   StatCard
   ===================================================================== */

function StatCard({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}