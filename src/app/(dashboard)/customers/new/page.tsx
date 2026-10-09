"use client";

import { useRouter } from "next/navigation";
import { CustomerForm } from "@/components/customers/customer-form";
import type { CreateCustomerInput } from "@/lib/validations/customer";

export default function NewCustomerPage() {
  const router = useRouter();

  async function handleSubmit(data: CreateCustomerInput) {
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : {};

    if (!res.ok || !json.success) {
      const fieldErrors = json?.errors?.fieldErrors;
      if (fieldErrors) {
        const first = Object.values(fieldErrors).flat()[0];
        throw new Error(String(first));
      }
      throw new Error(json?.message ?? "Failed to save customer");
    }

    router.push(`/customers/${json.data._id}/projects`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">New Customer</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the customer details. Once saved, you can create projects.
        </p>
      </header>

      <CustomerForm
        onSubmit={handleSubmit}
        submitLabel="Create Customer"
        onCancel={() => router.back()}
      />
    </div>
  );
}