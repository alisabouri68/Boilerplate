import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { DesignSystem } from "@/models/DesignSystem";
import "@/models/FontFamily";
import "@/models/FontSize";
import "@/models/FontWeight";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Invalid project id" },
        { status: 400 }
      );
    }

    const ds = await DesignSystem.findOne({
      project: id,
      isTemplate: false,
    })
      .populate("states")
      .populate("tokens")
      .populate("palettes")
      .populate("typography.families.sans")
      .populate("typography.families.serif")
      .populate("typography.families.mono")
      .populate("typography.families.display")
      .populate("typography.families.handwriting")
      .populate("typography.sizes")
      .populate("typography.weights")
      .lean();

    if (!ds) {
      return Response.json(
        { success: false, message: "No design system for this project" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: ds });
  } catch (err) {
    console.error("[GET /api/projects/:id/design-system/export]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}