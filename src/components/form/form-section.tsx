"use client";

import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function FormSection({
  title,
  description,
  children,
  icon,
}: FormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1 text-primary">{icon}</div>}
          <div className="flex-1">
            <CardTitle className="text-base">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}