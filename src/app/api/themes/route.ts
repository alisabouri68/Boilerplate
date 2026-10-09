import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { Theme } from "@/models/Theme";

/* =====================================================================
   Validation
   ===================================================================== */

const createThemeSchema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "At least 2 characters")
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase letters, numbers, and dashes"),
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional(),
});

/* =====================================================================
   GET — list
   ===================================================================== */

export async function GET() {
  try {
    await connectDB();
    const items = await Theme.find()
      .sort({ createdAt: 1 })
      .lean();
    return Response.json({ success: true, data: { items } });
  } catch (err) {
    console.error("[GET /api/themes]", err);
    return Response.json(
      { success: false, message: "Failed to load themes" },
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

    const input = createThemeSchema.parse(body);

    const existing = await Theme.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        {
          success: false,
          message: `Theme with key "${input.key}" already exists`,
        },
        { status: 409 }
      );
    }

    const created = await Theme.create(input);
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
    console.error("[POST /api/themes]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}