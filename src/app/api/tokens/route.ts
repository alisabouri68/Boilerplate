import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { Token } from "@/models/Token";

/* =====================================================================
   Validation
   ===================================================================== */

const createTokenSchema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "At least 2 characters")
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/, "Only lowercase letters, numbers, and dashes"),
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional(),
  scope: z.enum(["state", "theme"], {
    message: "Scope must be 'state' or 'theme'",
  }),
  type: z
    .enum(["color", "size", "radius", "font", "shadow", "other"])
    .default("color"),
  order: z.coerce.number().int().min(0).default(0),
});

/* =====================================================================
   GET — list (with optional scope filter)
   ===================================================================== */

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const scope = searchParams.get("scope");

    const filter: Record<string, string> = {};
    if (scope === "state" || scope === "theme") filter.scope = scope;

    const items = await Token.find(filter)
      .sort({ scope: 1, order: 1, createdAt: 1 })
      .lean();

    return Response.json({ success: true, data: { items } });
  } catch (err) {
    console.error("[GET /api/tokens]", err);
    return Response.json(
      { success: false, message: "Failed to load tokens" },
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

    const input = createTokenSchema.parse(body);

    const existing = await Token.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        {
          success: false,
          message: `Token with key "${input.key}" already exists`,
        },
        { status: 409 }
      );
    }

    const created = await Token.create(input);
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
    console.error("[POST /api/tokens]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}