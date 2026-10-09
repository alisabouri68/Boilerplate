import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  lead: "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300",
  prospect:
    "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300",
  active:
    "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300",
  inactive:
    "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
  churned:
    "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-300",
};

const statusLabels: Record<string, string> = {
  lead: "Lead",
  prospect: "Prospect",
  active: "Active",
  inactive: "Inactive",
  churned: "Churned",
};

interface CustomerStatusBadgeProps {
  status?: string;
  className?: string;
}

export function CustomerStatusBadge({
  status,
  className,
}: CustomerStatusBadgeProps) {
  const key = status ?? "lead";
  return (
    <Badge
      variant="secondary"
      className={cn(statusStyles[key], "font-medium", className)}
    >
      {statusLabels[key] ?? key}
    </Badge>
  );
}