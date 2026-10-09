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

const currencyOptions = [
  { value: "IRR", label: "IRR" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const termsOptions = [
  { value: "prepaid", label: "Prepaid" },
  { value: "net-15", label: "Net 15" },
  { value: "net-30", label: "Net 30" },
  { value: "net-60", label: "Net 60" },
];

const methodOptions = [
  { value: "card", label: "Card" },
  { value: "transfer", label: "Bank Transfer" },
  { value: "crypto", label: "Crypto" },
  { value: "cash", label: "Cash" },
];

export function BillingSection() {
  const form = useFormContext<CreateCustomerInput>();

  const selects = [
    { name: "billing.currency", label: "Currency", options: currencyOptions },
    { name: "billing.paymentTerms", label: "Payment Terms", options: termsOptions },
    { name: "billing.preferredMethod", label: "Preferred Method", options: methodOptions },
  ] as const;

  return (
    <FormSection title="Billing" description="Invoice and payment settings">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField
          control={form.control}
          name="billing.billingEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  dir="ltr"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billing.taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax ID</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selects.map(item => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
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
                    {item.options.map(o => (
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
        ))}
      </div>
    </FormSection>
  );
}