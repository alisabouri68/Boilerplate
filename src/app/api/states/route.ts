import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { State } from "@/models/State";

/* =====================================================================
   Validation
   ===================================================================== */

const createStateSchema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "At least 2 characters")
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase letters, numbers, and dashes"),
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional(),
  order: z.coerce.number().int().min(0).default(0),
});

/* =====================================================================
   GET — list
   ===================================================================== */

export async function GET() {
  try {
    await connectDB();
    const items = await State.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return Response.json({ success: true, data: { items } });
  } catch (err) {
    console.error("[GET /api/states]", err);
    return Response.json(
      { success: false, message: "Failed to load states" },
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

    const input = createStateSchema.parse(body);

    const existing = await State.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        {
          success: false,
          message: `State with key "${input.key}" already exists`,
        },
        { status: 409 }
      );
    }

    const created = await State.create(input);
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
    console.error("[POST /api/states]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}