import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { Theme } from "@/models/Theme";

type Params = { params: Promise<{ id: string }> };

/* =====================================================================
   Validation for PATCH
   ===================================================================== */

const patchThemeSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().max(500).optional(),
  values: z.record(z.string(), z.string()).optional(),
});

/* =====================================================================
   GET — single
   ===================================================================== */

export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Invalid id" },
        { status: 400 }
      );
    }

    const item = await Theme.findById(id).lean();
    if (!item) {
      return Response.json(
        { success: false, message: "Theme not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: item });
  } catch (err) {
    console.error("[GET /api/themes/:id]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =====================================================================
   PATCH — update (name, description, values)
   ===================================================================== */

export async function PATCH(req: NextRequest, { params }: Params) {
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
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const input = patchThemeSchema.parse(body);

    const theme = await Theme.findById(id);
    if (!theme) {
      return Response.json(
        { success: false, message: "Theme not found" },
        { status: 404 }
      );
    }

    // نام و توضیح
    if (input.name !== undefined) theme.name = input.name;
    if (input.description !== undefined) theme.description = input.description;

    // values — merge
    if (input.values) {
      for (const [k, v] of Object.entries(input.values)) {
        if (v === "") theme.values.delete(k);
        else theme.values.set(k, v);
      }
    }

    await theme.save();

    return Response.json({
      success: true,
      data: theme.toJSON(),
    });
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
    console.error("[PATCH /api/themes/:id]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =====================================================================
   DELETE
   ===================================================================== */

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Invalid id" },
        { status: 400 }
      );
    }

    const deleted = await Theme.findByIdAndDelete(id).lean();
    if (!deleted) {
      return Response.json(
        { success: false, message: "Theme not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: { id } });
  } catch (err) {
    console.error("[DELETE /api/themes/:id]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}