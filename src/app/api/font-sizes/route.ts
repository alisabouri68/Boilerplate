import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { FontSize } from "@/models/FontSize";
import { TAILWIND_FONT_SIZES } from "@/lib/config/typography-presets";

const createSchema = z.object({
  key: z.string().trim().toLowerCase().min(1).max(60).regex(/^[a-z0-9][a-z0-9-]*$/),
  name: z.string().trim().min(1).max(100),
  value: z.string().trim().min(1).max(30),
  lineHeight: z.string().trim().max(30).optional(),
  letterSpacing: z.string().trim().max(30).optional(),
  order: z.coerce.number().int().min(0).default(0),
});

export async function GET() {
  try {
    await connectDB();
    const items = await FontSize.find().sort({ order: 1, createdAt: 1 }).lean();
    return Response.json({ success: true, data: { items } });
  } catch (err) {
    console.error("[GET /api/font-sizes]", err);
    return Response.json(
      { success: false, message: "Failed to load font sizes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json({ success: false, message: "Invalid body" }, { status: 400 });
    }

    // حالت ویژه: load preset
    if (body.preset === "tailwind") {
      const existing = await FontSize.find().select("key").lean();
      const existingKeys = new Set(existing.map(e => e.key));

      const toAdd = TAILWIND_FONT_SIZES.filter(p => !existingKeys.has(p.key));

      if (toAdd.length === 0) {
        return Response.json({
          success: true,
          data: { added: 0, skipped: TAILWIND_FONT_SIZES.length },
        });
      }

      await FontSize.insertMany(toAdd);
      return Response.json({
        success: true,
        data: {
          added: toAdd.length,
          skipped: TAILWIND_FONT_SIZES.length - toAdd.length,
        },
      });
    }

    // ساخت تک
    const input = createSchema.parse(body);

    const existing = await FontSize.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        { success: false, message: `Size "${input.key}" already exists` },
        { status: 409 }
      );
    }

    const created = await FontSize.create(input);
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
    console.error("[POST /api/font-sizes]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}