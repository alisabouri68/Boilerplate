"use client";

import type { ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  required,
  description,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <FormItem className={className}>
      <FormLabel>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}