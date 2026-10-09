import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { FontFamily } from "@/models/FontFamily";

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

    const item = await FontFamily.findById(id).lean();
    if (!item) {
      return Response.json(
        { success: false, message: "Font not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: item });
  } catch (err) {
    console.error("[GET /api/font-families/:id]", err);
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

    const deleted = await FontFamily.findByIdAndDelete(id).lean();
    if (!deleted) {
      return Response.json(
        { success: false, message: "Font not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: { id } });
  } catch (err) {
    console.error("[DELETE /api/font-families/:id]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}