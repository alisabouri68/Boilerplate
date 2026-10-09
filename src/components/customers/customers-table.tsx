"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, FolderKanban, Eye } from "lucide-react";
import type { ICustomer } from "@/models/Customer";

interface CustomersTableProps {
  customers: ICustomer[];
  onDelete?: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  lead: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  prospect: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  active: "bg-green-100 text-green-700 hover:bg-green-100",
  inactive: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  churned: "bg-red-100 text-red-700 hover:bg-red-100",
};

const statusLabels: Record<string, string> = {
  lead: "Lead",
  prospect: "Prospect",
  active: "Active",
  inactive: "Inactive",
  churned: "Churned",
};

export function CustomersTable({ customers, onDelete }: CustomersTableProps) {
  const router = useRouter();

  function handleRowClick(id: string) {
    // کلیک روی ردیف → مستقیم به پروژه‌های مشتری
    router.push(`/customers/${id}`);
  }

  if (!customers.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <p className="text-sm text-muted-foreground">No customers found</p>
        <Button className="mt-4" onClick={() => router.push("/customers/new")}>
          Create your first customer
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-center">Projects</TableHead>
            <TableHead className="text-right">Created</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map(customer => {
            const id = String(customer._id);
            const name = getDisplayName(customer);
            const email = customer.contact?.email ?? "—";
            const initial = name.charAt(0).toUpperCase() || "?";

            return (
              <TableRow
                key={id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {initial}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{name}</span>
                      {customer.company?.name &&
                        customer.type === "company" &&
                        customer.displayName !== customer.company.name && (
                          <span className="text-xs text-muted-foreground">
                            {customer.company.name}
                          </span>
                        )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {customer.type}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusStyles[customer.status ?? "lead"]}
                  >
                    {statusLabels[customer.status ?? "lead"]}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{email}</span>
                    {customer.contact?.mobile && (
                      <span className="text-xs text-muted-foreground" dir="ltr">
                        {customer.contact.mobile}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <span className="text-sm font-medium">
                    {customer.projectCount ?? 0}
                  </span>
                </TableCell>

                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatDate(customer.createdAt)}
                </TableCell>

                <TableCell onClick={e => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/customers/${id}/projects`)}
                      >
                        <FolderKanban className="mr-2 h-4 w-4" />
                        Projects
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/customers/${id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/customers/${id}/edit`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete?.(id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

/* --------------------------- Helpers --------------------------- */

function getDisplayName(customer: ICustomer): string {
  if (customer.displayName) return customer.displayName;
  if (customer.type === "company" && customer.company?.name) {
    return customer.company.name;
  }
  const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ");
  return name || "Unnamed customer";
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