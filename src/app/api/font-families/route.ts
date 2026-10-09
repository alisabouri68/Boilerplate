import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { FontFamily } from "@/models/FontFamily";

/* =====================================================================
   Validation
   ===================================================================== */

const fontFileSchema = z.object({
  format: z.enum(["woff2", "woff", "ttf", "otf", "eot"]),
  url: z.string().trim().min(1),
  weight: z.number().int().min(100).max(900),
  style: z.enum(["normal", "italic"]).default("normal"),
  subset: z.string().trim().optional(),
  unicodeRange: z.string().trim().optional(),
});

const createFontFamilySchema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase letters, numbers, and dashes"),
  name: z.string().trim().min(1).max(100),
  category: z
    .enum(["sans", "serif", "mono", "display", "handwriting"])
    .default("sans"),
  description: z.string().trim().max(500).optional(),
  source: z.enum(["google", "custom", "local"]).default("google"),
  googleFamily: z.string().trim().optional(),
  files: z.array(fontFileSchema).default([]),
  weights: z.array(z.number().int().min(100).max(900)).default([400]),
  styles: z
    .array(z.enum(["normal", "italic"]))
    .default(["normal"]),
  subsets: z.array(z.string().trim()).default(["latin"]),
  previewText: z.string().trim().max(200).optional(),
});

/* =====================================================================
   GET — list
   ===================================================================== */

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const source = searchParams.get("source");

    const filter: Record<string, string> = {};
    if (category) filter.category = category;
    if (source) filter.source = source;

    const items = await FontFamily.find(filter)
      .sort({ category: 1, name: 1 })
      .lean();

    return Response.json({ success: true, data: { items } });
  } catch (err) {
    console.error("[GET /api/font-families]", err);
    return Response.json(
      { success: false, message: "Failed to load fonts" },
      { status: 500 }
    );
  }
}

/* =====================================================================
   POST — create
   ===================================================================== */

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

    const input = createFontFamilySchema.parse(body);

    const existing = await FontFamily.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        {
          success: false,
          message: `Font with key "${input.key}" already exists`,
        },
        { status: 409 }
      );
    }

    const created = await FontFamily.create(input);
    return Response.json(
      { success: true, data: created.toJSON() },
      { status: 201 }
    );
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
    console.error("[POST /api/font-families]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}