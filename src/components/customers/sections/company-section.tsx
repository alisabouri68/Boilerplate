"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "@/components/form/form-section";
import type { CreateCustomerInput } from "@/lib/validations/customer";

const sizeOptions = [
  { value: "1-10", label: "1 – 10 employees" },
  { value: "11-50", label: "11 – 50 employees" },
  { value: "51-200", label: "51 – 200 employees" },
  { value: "201-500", label: "201 – 500 employees" },
  { value: "500+", label: "500+ employees" },
];

export function CompanySection() {
  const form = useFormContext<CreateCustomerInput>();
  const type = form.watch("type");

  if (type !== "company") return null;

  const textFields = [
    { name: "company.name", label: "Company Name", required: true },
    { name: "company.legalName", label: "Legal Name" },
    { name: "company.registrationNumber", label: "Registration Number" },
    { name: "company.nationalId", label: "National ID" },
    { name: "company.economicCode", label: "Economic Code" },
    { name: "company.industry", label: "Industry" },
    { name: "company.website", label: "Website" },
  ] as const;

  return (
    <FormSection
      title="Company Information"
      description="Legal and registration details"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {textFields.map(item => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {item.label}
                  {"required" in item && item.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    dir={item.name.includes("website") ? "ltr" : undefined}
                    {...field}
                    value={(field.value as string) ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name="company.size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Size</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={(field.value as string) ?? ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizeOptions.map(o => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}