"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommandMenu() {
  return (
    <Button
      variant="outline"
      className="hidden md:flex w-64 justify-start gap-2 text-muted-foreground"
    >
      <Search className="h-4 w-4" />
      <span className="text-sm">Search...</span>
      <kbd className="ml-auto pointer-events-none rounded border bg-muted px-1.5 text-[10px]">
        ⌘K
      </kbd>
    </Button>
  );
}