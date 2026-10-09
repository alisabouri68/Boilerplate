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
import { FormSection } from "@/components/form/form-section";
import type { CreateCustomerInput } from "@/lib/validations/customer";

const fields = [
  { name: "contact.email", label: "Email", type: "email" },
  { name: "contact.mobile", label: "Mobile" },
  { name: "contact.phone", label: "Phone" },
  { name: "contact.fax", label: "Fax" },
  { name: "contact.website", label: "Website" },
] as const;

export function ContactSection() {
  const form = useFormContext<CreateCustomerInput>();

  return (
    <FormSection
      title="Contact Details"
      description="At least one of email, mobile, or phone is required"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {fields.map(item => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input
                    type={"type" in item ? item.type : "text"}
                    dir="ltr"
                    {...field}
                    value={(field.value as string) ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </FormSection>
  );
}