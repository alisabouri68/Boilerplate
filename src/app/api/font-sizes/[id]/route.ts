import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { FontSize } from "@/models/FontSize";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json({ success: false, message: "Invalid id" }, { status: 400 });
    }

    const item = await FontSize.findById(id).lean();
    if (!item) {
      return Response.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: item });
  } catch (err) {
    console.error("[GET /api/font-sizes/:id]", err);
    return Response.json({ success: false, message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json({ success: false, message: "Invalid id" }, { status: 400 });
    }

    const deleted = await FontSize.findByIdAndDelete(id).lean();
    if (!deleted) {
      return Response.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: { id } });
  } catch (err) {
    console.error("[DELETE /api/font-sizes/:id]", err);
    return Response.json({ success: false, message: "Internal error" }, { status: 500 });
  }
}