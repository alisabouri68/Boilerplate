"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ICustomer } from "@/models/Customer";

interface CustomerInfoCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function CustomerInfoCard({
  title,
  icon,
  children,
}: CustomerInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

/* --------------------------- InfoRow ---------------------------- */

interface InfoRowProps {
  label: string;
  value?: string | null;
  ltr?: boolean;
}

export function InfoRow({ label, value, ltr }: InfoRowProps) {
  if (!value) return null;

  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className="text-sm font-medium text-right"
        dir={ltr ? "ltr" : undefined}
      >
        {value}
      </span>
    </div>
  );
}

/* ------------------------ Display name helper ------------------- */

export function getCustomerDisplayName(customer: ICustomer): string {
  if (customer.displayName) return customer.displayName;
  if (customer.type === "company" && customer.company?.name) {
    return customer.company.name;
  }
  const name = [customer.firstName, customer.lastName]
    .filter(Boolean)
    .join(" ");
  return name || "Unnamed customer";
}