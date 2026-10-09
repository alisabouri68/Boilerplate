"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TechPickerProps {
  label: string;
  description?: string;
  value: string[];
  onChange: (v: string[]) => void;
  presets: string[];
}

export function TechPicker({
  label,
  description,
  value,
  onChange,
  presets,
}: TechPickerProps) {
  const [custom, setCustom] = useState("");

  function toggle(tech: string) {
    if (value.includes(tech)) {
      onChange(value.filter(t => t !== tech));
    } else {
      onChange([...value, tech]);
    }
  }

  function addCustom() {
    const trimmed = custom.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) {
      setCustom("");
      return;
    }
    onChange([...value, trimmed]);
    setCustom("");
  }

  const customItems = value.filter(v => !presets.includes(v));

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3">
        <h3 className="font-medium">{label}</h3>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map(preset => {
          const active = value.includes(preset);
          return (
            <button
              key={preset}
              type="button"
              onClick={() => toggle(preset)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-accent"
              )}
            >
              {preset}
            </button>
          );
        })}
      </div>

      {/* Custom items */}
      {customItems.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {customItems.map(item => (
            <Badge key={item} variant="secondary" className="gap-1">
              {item}
              <button
                type="button"
                onClick={() => onChange(value.filter(v => v !== item))}
                className="ml-0.5 rounded-full hover:bg-destructive/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Custom input */}
      <div className="mt-3 flex gap-2">
        <Input
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder="Add custom..."
          className="h-8 text-sm"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addCustom}
          className="h-8"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Selected count */}
      {value.length > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          {value.length} selected
        </p>
      )}
    </div>
  );
}