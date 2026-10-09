"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "@/components/form/form-section";
import { TechPicker } from "./tech-picker";
import { FRONTEND_TECH, BACKEND_TECH, DATABASE_TECH } from "@/config/tech-stack";
import {
  createProjectSchema,
  type CreateProjectInput,
} from "@/lib/validations/project";

interface ProjectFormProps {
  defaultValues?: Partial<CreateProjectInput>;
  onSubmit: (data: CreateProjectInput) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

const typeOptions = [
  { value: "web-app", label: "Web App" },
  { value: "landing", label: "Landing Page" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "dashboard", label: "Dashboard" },
  { value: "saas", label: "SaaS" },
  { value: "api-only", label: "API Only" },
  { value: "mobile", label: "Mobile App" },
  { value: "other", label: "Other" },
];

const emptyDefaults: CreateProjectInput = {
  name: "",
  type: "web-app",
  status: "draft",
  description: "",
  techStack: { frontend: [], backend: [], database: [] },
};

export function ProjectForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Create Project",
}: ProjectFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema) as never,
    defaultValues: {
      ...emptyDefaults,
      ...defaultValues,
      techStack: {
        frontend: defaultValues?.techStack?.frontend ?? [],
        backend: defaultValues?.techStack?.backend ?? [],
        database: defaultValues?.techStack?.database ?? [],
      },
    },
    mode: "onBlur",
  });

  const submit = form.handleSubmit(async data => {
    setServerError(null);
    try {
      await onSubmit(data);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to save");
    }
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={submit} className="flex flex-col gap-6">
        {/* Basic info */}
        <FormSection
          title="Project Details"
          description="Name, type, and description"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Acme Admin Panel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={v => field.onChange(v ?? "web-app")}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map(o => (
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief project overview..."
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

        {/* Tech Stack */}
        <FormSection
          title="Tech Stack"
          description="Choose the frontend, backend, and database technologies"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Controller
              control={form.control}
              name="techStack.frontend"
              render={({ field }) => (
                <TechPicker
                  label="Frontend"
                  description="UI frameworks, languages, styling"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  presets={FRONTEND_TECH}
                />
              )}
            />

            <Controller
              control={form.control}
              name="techStack.backend"
              render={({ field }) => (
                <TechPicker
                  label="Backend"
                  description="Servers, frameworks, runtimes"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  presets={BACKEND_TECH}
                />
              )}
            />

            <Controller
              control={form.control}
              name="techStack.database"
              render={({ field }) => (
                <TechPicker
                  label="Database"
                  description="Databases and ORMs"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  presets={DATABASE_TECH}
                />
              )}
            />
          </div>
        </FormSection>

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