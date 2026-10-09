import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { FontFamily } from "@/models/FontFamily";
import {
  GOOGLE_FONTS_PRESETS,
  slugifyFamily,
} from "@/lib/config/google-fonts";

const importSchema = z.object({
  families: z.array(z.string()).min(1),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const input = importSchema.parse(body);

    const results = {
      imported: [] as string[],
      skipped: [] as string[],
      failed: [] as { family: string; error: string }[],
    };

    for (const familyName of input.families) {
      const preset = GOOGLE_FONTS_PRESETS.find(
        p => p.family === familyName
      );

      if (!preset) {
        results.failed.push({
          family: familyName,
          error: "Preset not found",
        });
        continue;
      }

      const key = preset.key ?? slugifyFamily(preset.family);

      const existing = await FontFamily.findOne({ key });
      if (existing) {
        results.skipped.push(familyName);
        continue;
      }

      try {
        await FontFamily.create({
          key,
          name: preset.family,
          category: preset.category,
          source: "google",
          googleFamily: preset.family,
          weights: preset.weights,
          styles: preset.styles,
          subsets: preset.subsets,
          files: [],
        });
        results.imported.push(familyName);
      } catch (err) {
        results.failed.push({
          family: familyName,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    return Response.json({ success: true, data: results });
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: err.flatten(),
        },
        { status: 422 }
      );
    }
    console.error("[POST /api/font-families/import-google]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}