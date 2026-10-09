import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { DesignSystem } from "@/models/DesignSystem";

type Params = { params: Promise<{ id: string }> };

/**
 * DS پروژه رو با states/tokens/palettes populate شده برمی‌گردونه.
 * تم‌ها embed شده هستن (values داخلشون).
 */
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