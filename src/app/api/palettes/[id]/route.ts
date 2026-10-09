import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { ColorPalette } from "@/models/ColorPalette";

type Params = { params: Promise<{ id: string }> };

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

    const item = await ColorPalette.findById(id).lean();
    if (!item) {
      return Response.json(
        { success: false, message: "Palette not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: item });
  } catch (err) {
    console.error("[GET /api/palettes/:id]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

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

    const deleted = await ColorPalette.findByIdAndDelete(id).lean();
    if (!deleted) {
      return Response.json(
        { success: false, message: "Palette not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: { id } });
  } catch (err) {
    console.error("[DELETE /api/palettes/:id]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}