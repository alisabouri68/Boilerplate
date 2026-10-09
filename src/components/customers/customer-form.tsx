"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  createCustomerSchema,
  type CreateCustomerInput,
} from "@/lib/validations/customer";
import { BasicInfoSection } from "./sections/basic-info-section";
import { CompanySection } from "./sections/company-section";
import { ContactSection } from "./sections/contact-section";
import { AddressSection } from "./sections/address-section";
import { BillingSection } from "./sections/billing-section";
import { PreferencesSection } from "./sections/preferences-section";

interface CustomerFormProps {
  defaultValues?: Partial<CreateCustomerInput>;
  onSubmit: (data: CreateCustomerInput) => Promise<void>;
  submitLabel?: string;
  onCancel?: () => void;
}

const emptyDefaults: CreateCustomerInput = {
  type: "company",
  status: "lead",
  contact: {},
  contacts: [],
  billing: { currency: "USD", paymentTerms: "prepaid" },
  preferences: {
    locale: "en",
    timezone: "UTC",
    communicationChannel: "email",
  },
  tags: [],
};

export function CustomerForm({
  defaultValues,
  onSubmit,
  submitLabel = "Create Customer",
  onCancel,
}: CustomerFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CreateCustomerInput>({
    resolver: zodResolver(
      createCustomerSchema
    ) as unknown as Resolver<CreateCustomerInput>,
    defaultValues: { ...emptyDefaults, ...defaultValues },
    mode: "onBlur",
  });

  const submit = form.handleSubmit(async data => {
    setServerError(null);
    try {
      await onSubmit(data);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to save customer"
      );
    }
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={submit} className="flex flex-col gap-6">
        <BasicInfoSection />
        <CompanySection />
        <ContactSection />
        <AddressSection />
        <BillingSection />
        <PreferencesSection />

        {serverError ? (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{serverError}</span>
          </div>
        ) : null}

        <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3 rounded-2xl border bg-background/80 p-3 shadow-lg backdrop-blur">
          {onCancel ? (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          ) : null}

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}