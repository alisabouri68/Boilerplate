import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { ColorPalette } from "@/models/ColorPalette";

type Params = { params: Promise<{ id: string }> };

const schema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/),
  name: z.string().trim().min(1).max(100),
});

export async function POST(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Invalid id" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json(
        { success: false, message: "Invalid body" },
        { status: 400 }
      );
    }

    const input = schema.parse(body);

    const source = await ColorPalette.findById(id).lean();
    if (!source) {
      return Response.json(
        { success: false, message: "Palette not found" },
        { status: 404 }
      );
    }

    const existing = await ColorPalette.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        { success: false, message: `Palette with key "${input.key}" already exists` },
        { status: 409 }
      );
    }

    const created = await ColorPalette.create({
      key: input.key,
      name: input.name,
      description: source.description
        ? `${source.description} (copy)`
        : `Copy of ${source.name}`,
      shades: source.shades,
    });

    return Response.json(
      { success: true, data: created.toJSON() },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json(
        { success: false, message: "Validation failed", errors: err.flatten() },
        { status: 422 }
      );
    }
    console.error("[POST /api/palettes/:id/duplicate]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}