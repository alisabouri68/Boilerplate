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

const localeOptions = [
  { value: "en", label: "English" },
  { value: "fa", label: "Persian" },
];

const channelOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "slack", label: "Slack" },
];

export function PreferencesSection() {
  const form = useFormContext<CreateCustomerInput>();

  const selects = [
    { name: "preferences.locale", label: "Language", options: localeOptions },
    { name: "preferences.communicationChannel", label: "Preferred Channel", options: channelOptions },
  ] as const;

  return (
    <FormSection
      title="Preferences"
      description="Language, timezone, and communication channel"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                      <SelectValue />
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

        <FormField
          control={form.control}
          name="preferences.timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <Input
                  dir="ltr"
                  placeholder="UTC"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}