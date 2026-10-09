import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { FontWeight } from "@/models/FontWeight";
import { STANDARD_FONT_WEIGHTS } from "@/lib/config/typography-presets";

const createSchema = z.object({
  key: z.string().trim().toLowerCase().min(1).max(60).regex(/^[a-z][a-z0-9-]*$/),
  name: z.string().trim().min(1).max(100),
  value: z.number().int().min(100).max(900).refine(v => v % 100 === 0, "Multiple of 100"),
  order: z.coerce.number().int().min(0).default(0),
});

export async function GET() {
  try {
    await connectDB();
    const items = await FontWeight.find().sort({ order: 1, createdAt: 1 }).lean();
    return Response.json({ success: true, data: { items } });
  } catch (err) {
    console.error("[GET /api/font-weights]", err);
    return Response.json(
      { success: false, message: "Failed to load font weights" },
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

    if (body.preset === "standard") {
      const existing = await FontWeight.find().select("key").lean();
      const existingKeys = new Set(existing.map(e => e.key));

      const toAdd = STANDARD_FONT_WEIGHTS.filter(p => !existingKeys.has(p.key));

      if (toAdd.length === 0) {
        return Response.json({
          success: true,
          data: { added: 0, skipped: STANDARD_FONT_WEIGHTS.length },
        });
      }

      await FontWeight.insertMany(toAdd);
      return Response.json({
        success: true,
        data: {
          added: toAdd.length,
          skipped: STANDARD_FONT_WEIGHTS.length - toAdd.length,
        },
      });
    }

    const input = createSchema.parse(body);

    const existing = await FontWeight.findOne({ key: input.key });
    if (existing) {
      return Response.json(
        { success: false, message: `Weight "${input.key}" already exists` },
        { status: 409 }
      );
    }

    const created = await FontWeight.create(input);
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
    console.error("[POST /api/font-weights]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}