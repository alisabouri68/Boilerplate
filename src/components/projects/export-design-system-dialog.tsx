"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  exportToCss,
  exportToScss,
  exportToJson,
  exportToTailwind,
  type DesignSystemData,
} from "@/lib/export/design-system-export";

interface ExportDesignSystemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: DesignSystemData;
}

export function ExportDesignSystemDialog({
  open,
  onOpenChange,
  data,
}: ExportDesignSystemDialogProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const outputs = useMemo(
    () => ({
      css: exportToCss(data),
      scss: exportToScss(data),
      json: exportToJson(data),
      tailwind: exportToTailwind(data),
    }),
    [data]
  );

  async function copy(text: string, type: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  function download(text: string, filename: string) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="flex items-center gap-2">
            Export Design System
            <Badge variant="outline" className="text-xs">
              {data.themes.length} themes
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Copy or download the complete design system
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="css" className="flex flex-col">
          <div className="border-b bg-muted/30 px-6 pt-3">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger
                value="css"
                className="data-[state=active]:bg-background"
              >
                CSS
              </TabsTrigger>
              <TabsTrigger
                value="scss"
                className="data-[state=active]:bg-background"
              >
                SCSS
              </TabsTrigger>
              <TabsTrigger
                value="json"
                className="data-[state=active]:bg-background"
              >
                JSON
              </TabsTrigger>
              <TabsTrigger
                value="tailwind"
                className="data-[state=active]:bg-background"
              >
                Tailwind
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
            <TabsContent value="css" className="mt-0">
              <CodeBlock
                code={outputs.css}
                onCopy={() => copy(outputs.css, "css")}
                onDownload={() => download(outputs.css, "design-system.css")}
                copied={copied === "css"}
                filename="design-system.css"
              />
            </TabsContent>

            <TabsContent value="scss" className="mt-0">
              <CodeBlock
                code={outputs.scss}
                onCopy={() => copy(outputs.scss, "scss")}
                onDownload={() => download(outputs.scss, "design-system.scss")}
                copied={copied === "scss"}
                filename="design-system.scss"
              />
            </TabsContent>

            <TabsContent value="json" className="mt-0">
              <CodeBlock
                code={outputs.json}
                onCopy={() => copy(outputs.json, "json")}
                onDownload={() => download(outputs.json, "design-system.json")}
                copied={copied === "json"}
                filename="design-system.json"
              />
            </TabsContent>

            <TabsContent value="tailwind" className="mt-0">
              <CodeBlock
                code={outputs.tailwind}
                onCopy={() => copy(outputs.tailwind, "tailwind")}
                onDownload={() =>
                  download(outputs.tailwind, "tailwind.config.js")
                }
                copied={copied === "tailwind"}
                filename="tailwind.config.js"
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function CodeBlock({
  code,
  onCopy,
  onDownload,
  copied,
  filename,
}: {
  code: string;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
  filename: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-mono">{filename}</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="mr-2 h-3.5 w-3.5" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={onCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-3.5 w-3.5 text-green-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      <pre className="rounded-lg border bg-muted/50 p-4 text-xs font-mono overflow-x-auto max-h-96">
        <code>{code || "// No content"}</code>
      </pre>
    </div>
  );
}