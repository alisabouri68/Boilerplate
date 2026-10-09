"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IProject } from "@/models/Project";

export function DatabaseTab({ project }: { project: IProject }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Database Tech Stack</CardTitle>
        <CardDescription>Databases and ORMs</CardDescription>
      </CardHeader>
      <CardContent>
        {project.techStack?.database?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.database.map(t => (
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