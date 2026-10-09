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

const simpleFields = [
  { name: "address.province", label: "Province / State" },
  { name: "address.city", label: "City" },
  { name: "address.postalCode", label: "Postal Code" },
  { name: "address.country", label: "Country" },
] as const;

export function AddressSection() {
  const form = useFormContext<CreateCustomerInput>();

  return (
    <FormSection title="Address" description="Mailing address">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {simpleFields.map(item => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {(["address.line1", "address.line2"] as const).map((name, idx) => (
          <FormField
            key={name}
            control={form.control}
            name={name as never}
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>
                  {idx === 0 ? "Address Line 1" : "Address Line 2"}
                </FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) ?? ""} />
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