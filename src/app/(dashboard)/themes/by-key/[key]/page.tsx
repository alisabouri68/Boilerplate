"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ key: string }>;
}

export default function ThemeByKeyPage({ params }: PageProps) {
  const { key } = use(params);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/themes/by-key/${key}`);
        const json = await res.json();
        if (res.ok && json.success && json.data?._id) {
          router.replace(`/themes/${json.data._id}`);
        } else {
          router.replace("/themes");
        }
      } catch {
        router.replace("/themes");
      }
    })();
  }, [key, router]);

  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}