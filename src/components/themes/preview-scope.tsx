"use client";

import type { ReactNode } from "react";

interface PreviewScopeProps {
  /** { "--bg-brand": "#f0fdf4", ... } */
  cssVars: Record<string, string>;
  children: ReactNode;
  className?: string;
}

export function PreviewScope({
  cssVars,
  children,
  className,
}: PreviewScopeProps) {
  return (
    <div
      className={className}
      style={cssVars as React.CSSProperties}
    >
      {children}
    </div>
  );
}