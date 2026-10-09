import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { isValidObjectId, Types } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { DesignSystem } from "@/models/DesignSystem";
import { State } from "@/models/State";
import { Token } from "@/models/Token";
import { ColorPalette } from "@/models/ColorPalette";
import { Theme } from "@/models/Theme";

type Params = { params: Promise<{ id: string }> };

const createDSSchema = z.object({
  name: z.string().trim().min(1).max(200).default("Design System"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(60)
    .regex(/^[a-z][a-z0-9-]*$/)
    .default("design-system"),
  description: z.string().trim().max(1000).optional(),

  mode: z.enum(["library", "custom"]).default("library"),
  themeKeys: z.array(z.string()).default([]),
});

/* =====================================================================
   GET
   ===================================================================== */

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

    const ds = await DesignSystem.findOne({ project: id, isTemplate: false })
      .populate("states")
      .populate("tokens")
      .populate("palettes")
      .lean();

    if (!ds) {
      return Response.json({ success: true, data: null });
    }

    return Response.json({ success: true, data: ds });
  } catch (err) {
    console.error("[GET DS]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =====================================================================
   POST
   ===================================================================== */

export async function POST(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Invalid project id" },
        { status: 400 }
      );
    }

    const existing = await DesignSystem.findOne({
      project: id,
      isTemplate: false,
    });
    if (existing) {
      return Response.json(
        { success: false, message: "This project already has a design system" },
        { status: 409 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const input = createDSSchema.parse(body);

    let stateIds: Types.ObjectId[] = [];
    let tokenIds: Types.ObjectId[] = [];
    let paletteIds: Types.ObjectId[] = [];
    let themes: Array<{
      key: string;
      name: string;
      description?: string;
      isDefault: boolean;
      values: Map<string, string>;
    }> = [];

    // استیت/توکن/پالت همیشه کامل
    const [allStates, allTokens, allPalettes] = await Promise.all([
      State.find().sort({ order: 1 }).select("_id").lean(),
      Token.find().sort({ scope: 1, order: 1 }).select("_id").lean(),
      ColorPalette.find().sort({ key: 1 }).select("_id").lean(),
    ]);

    stateIds = allStates.map((s: { _id: Types.ObjectId }) => s._id);
    tokenIds = allTokens.map((t: { _id: Types.ObjectId }) => t._id);
    paletteIds = allPalettes.map((p: { _id: Types.ObjectId }) => p._id);

    // تم‌ها بر اساس mode
    let themeDocs;
    if (input.mode === "library") {
      themeDocs = await Theme.find().sort({ createdAt: 1 }).lean();
    } else {
      themeDocs = await Theme.find({ key: { $in: input.themeKeys } })
        .sort({ createdAt: 1 })
        .lean();
    }

themes = themeDocs.map((t, idx) => ({
  key: t.key,
  name: t.name,
  description: t.description,
  isDefault: idx === 0,
  values: new Map<string, string>(
    Object.entries(t.values ?? {}) as [string, string][]
  ),
}));
    if (themes.length === 0) {
      themes = [
        {
          key: "light",
          name: "Light",
          description: "Default light theme",
          isDefault: true,
          values: new Map<string, string>(),
        },
      ];
    }

    console.log(
      `[DS POST] project=${id} themes=${themes.length} [${themes.map(t => t.key).join(", ")}]`
    );

    const ds = await DesignSystem.create({
      project: id,
      name: input.name,
      slug: input.slug,
      description: input.description,
      isTemplate: false,
      states: stateIds,
      tokens: tokenIds,
      palettes: paletteIds,
      themes,
    });

    return Response.json(
      { success: true, data: ds.toJSON() },
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
    console.error("[POST DS]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}