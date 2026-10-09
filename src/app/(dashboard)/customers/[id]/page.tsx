"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  CreditCard,
  Settings2,
  User,
  FolderKanban,
  Loader2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CustomerInfoCard,
  InfoRow,
  getCustomerDisplayName,
} from "@/components/customers/customer-info-card";
import { CustomerStatusBadge } from "@/components/customers/customer-status-badge";
import { CustomerActions } from "@/components/customers/customer-actions";
import type { ICustomer } from "@/models/Customer";
import type { IProject } from "@/models/Project";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface CustomerWithProjects extends ICustomer {
  projects?: IProject[];
}

export default function CustomerDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerWithProjects | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/customers/${id}`);
        const text = await res.text();
        const json = text ? JSON.parse(text) : {};

        if (!res.ok || !json.success) {
          throw new Error(json?.message ?? `Failed (${res.status})`);
        }

        if (cancelled) return;
        setCustomer(json.data);
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

  if (error || !customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive">{error ?? "Not found"}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/customers")}
        >
          Back to Customers
        </Button>
      </div>
    );
  }

  const displayName = getCustomerDisplayName(customer);
  const initial = displayName.charAt(0).toUpperCase() || "?";
  const projects = customer.projects ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/customers")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-1 items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
            {initial}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {displayName}
              </h1>
              <CustomerStatusBadge status={customer.status} />
              <Badge variant="outline" className="capitalize">
                {customer.type}
              </Badge>
            </div>

            {customer.company?.name &&
              customer.type === "company" &&
              customer.displayName !== customer.company.name && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {customer.company.name}
                </p>
              )}

            {customer.description && (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {customer.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`/customers/${id}/projects/new`}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
          <CustomerActions customerId={id} customerName={displayName} />
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Projects"
          value={projects.length}
          icon={<FolderKanban className="h-4 w-4" />}
        />
        <StatCard
          label="Total Revenue"
          value={`${(customer.totalRevenue ?? 0).toLocaleString()}`}
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          label="Customer Since"
          value={formatDate(customer.createdAt)}
          icon={<User className="h-4 w-4" />}
        />
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CustomerInfoCard
          title="Contact"
          icon={<Mail className="h-4 w-4 text-primary" />}
        >
          <div className="divide-y">
            <InfoRow label="Email" value={customer.contact?.email} ltr />
            <InfoRow label="Mobile" value={customer.contact?.mobile} ltr />
            <InfoRow label="Phone" value={customer.contact?.phone} ltr />
            <InfoRow label="Fax" value={customer.contact?.fax} ltr />
            <InfoRow label="Website" value={customer.contact?.website} ltr />
          </div>
        </CustomerInfoCard>

        {customer.type === "company" && customer.company && (
          <CustomerInfoCard
            title="Company"
            icon={<Building2 className="h-4 w-4 text-primary" />}
          >
            <div className="divide-y">
              <InfoRow label="Company Name" value={customer.company.name} />
              <InfoRow label="Legal Name" value={customer.company.legalName} />
              <InfoRow
                label="Registration No."
                value={customer.company.registrationNumber}
                ltr
              />
              <InfoRow
                label="National ID"
                value={customer.company.nationalId}
                ltr
              />
              <InfoRow
                label="Economic Code"
                value={customer.company.economicCode}
                ltr
              />
              <InfoRow label="Industry" value={customer.company.industry} />
              <InfoRow
                label="Company Size"
                value={customer.company.size}
                ltr
              />
              <InfoRow label="Website" value={customer.company.website} ltr />
            </div>
          </CustomerInfoCard>
        )}

        {customer.address &&
          Object.values(customer.address).some(Boolean) && (
            <CustomerInfoCard
              title="Address"
              icon={<MapPin className="h-4 w-4 text-primary" />}
            >
              <div className="divide-y">
                <InfoRow label="Line 1" value={customer.address.line1} />
                <InfoRow label="Line 2" value={customer.address.line2} />
                <InfoRow label="City" value={customer.address.city} />
                <InfoRow label="Province" value={customer.address.province} />
                <InfoRow
                  label="Postal Code"
                  value={customer.address.postalCode}
                  ltr
                />
                <InfoRow label="Country" value={customer.address.country} />
              </div>
            </CustomerInfoCard>
          )}

        {customer.billing && (
          <CustomerInfoCard
            title="Billing"
            icon={<CreditCard className="h-4 w-4 text-primary" />}
          >
            <div className="divide-y">
              <InfoRow
                label="Billing Email"
                value={customer.billing.billingEmail}
                ltr
              />
              <InfoRow label="Tax ID" value={customer.billing.taxId} ltr />
              <InfoRow label="Currency" value={customer.billing.currency} />
              <InfoRow
                label="Payment Terms"
                value={customer.billing.paymentTerms}
              />
              <InfoRow
                label="Preferred Method"
                value={customer.billing.preferredMethod}
              />
            </div>
          </CustomerInfoCard>
        )}

        {customer.preferences && (
          <CustomerInfoCard
            title="Preferences"
            icon={<Settings2 className="h-4 w-4 text-primary" />}
          >
            <div className="divide-y">
              <InfoRow label="Language" value={customer.preferences.locale} />
              <InfoRow
                label="Timezone"
                value={customer.preferences.timezone}
                ltr
              />
              <InfoRow
                label="Channel"
                value={customer.preferences.communicationChannel}
              />
            </div>
          </CustomerInfoCard>
        )}
      </div>

      {/* Projects preview */}
      <CustomerInfoCard
        title={`Projects (${projects.length})`}
        icon={<FolderKanban className="h-4 w-4 text-primary" />}
      >
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No projects yet for this customer.
            </p>
            <Button variant="outline" className="mt-3" asChild>
              <Link href={`/customers/${id}/projects/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Project
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.slice(0, 5).map(project => (
              <Link
                key={String(project._id)}
                href={`/projects/${project._id}`}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {project.type} · {project.status}
                  </p>
                </div>
              </Link>
            ))}
            {projects.length > 5 && (
              <Button variant="ghost" className="w-full" asChild>
                <Link href={`/customers/${id}/projects`}>
                  View all {projects.length} projects
                </Link>
              </Button>
            )}
          </div>
        )}
      </CustomerInfoCard>
    </div>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function formatDate(date?: Date | string): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}