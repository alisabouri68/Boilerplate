import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { ColorPalette } from "@/models/ColorPalette";

/* =====================================================================
   Validation
   ===================================================================== */

const hexSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/,
    "Must be a valid HEX color"
  );

const shadesSchema = z.object({
  50: hexSchema,
  100: hexSchema,
  200: hexSchema,
  300: hexSchema,
  400: hexSchema,
  500: hexSchema,
  600: hexSchema,
  700: hexSchema,
  800: hexSchema,
  900: hexSchema,
  950: hexSchema,
});

const createPaletteSchema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "At least 2 characters")
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase letters, numbers, and dashes"),
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional(),
  shades: shadesSchema,
});

/* =====================================================================
   GET — list
   ===================================================================== */

export async function GET() {
  try {
    await connectDB();
    const items = await ColorPalette.find()
      .sort({ createdAt: -1 })
      .lean();
    return Response.json({ success: true, data: { items } });
  } catch (err) {
    console.error("[GET /api/palettes]", err);
    return Response.json(
      { success: false, message: "Failed to load palettes" },
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

    const input = createPaletteSchema.parse(body);

    const existing = await ColorPalette.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        {
          success: false,
          message: `Palette with key "${input.key}" already exists`,
        },
        { status: 409 }
      );
    }

    const created = await ColorPalette.create(input);
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
    console.error("[POST /api/palettes]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}