import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Theme } from "@/models/Theme";

type Params = { params: Promise<{ key: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { key } = await params;

    const theme = await Theme.findOne({ key: key.toLowerCase() }).lean();
    if (!theme) {
      return Response.json(
        { success: false, message: "Theme not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: theme });
  } catch (err) {
    console.error("[GET /api/themes/by-key/:key]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}