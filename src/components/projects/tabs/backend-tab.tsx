"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IProject } from "@/models/Project";

export function BackendTab({ project }: { project: IProject }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Backend Tech Stack</CardTitle>
        <CardDescription>Servers, frameworks, and runtimes</CardDescription>
      </CardHeader>
      <CardContent>
        {project.techStack?.backend?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.backend.map(t => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No tech selected</p>
        )}
      </CardContent>
    </Card>
  );
}