import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { DesignSystem } from "@/models/DesignSystem";
import { FontFamily } from "@/models/FontFamily";
import { FontSize } from "@/models/FontSize";
import { FontWeight } from "@/models/FontWeight";

type Params = { params: Promise<{ id: string }> };

/* =====================================================================
   Validation
   ===================================================================== */

const updateSchema = z.object({
  families: z
    .object({
      sans: z.string().optional().nullable(),
      serif: z.string().optional().nullable(),
      mono: z.string().optional().nullable(),
      display: z.string().optional().nullable(),
      handwriting: z.string().optional().nullable(),
    })
    .optional(),
  sizes: z.array(z.string()).optional(),
  weights: z.array(z.string()).optional(),
});

/* =====================================================================
   GET — DS با typography populate
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

    const ds = await DesignSystem.findOne({
      project: id,
      isTemplate: false,
    })
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
    console.error("[GET DS typography]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =====================================================================
   PATCH — update typography
   ===================================================================== */

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Invalid project id" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json(
        { success: false, message: "Invalid body" },
        { status: 400 }
      );
    }

    const input = updateSchema.parse(body);

    const ds = await DesignSystem.findOne({
      project: id,
      isTemplate: false,
    });

    if (!ds) {
      return Response.json(
        { success: false, message: "No design system for this project" },
        { status: 404 }
      );
    }

    // families
    if (input.families) {
      const f = input.families;
      const families = ds.typography?.families ?? {};

      if (f.sans !== undefined) {
        families.sans = f.sans && isValidObjectId(f.sans)
          ? (f.sans as never)
          : undefined;
      }
      if (f.serif !== undefined) {
        families.serif = f.serif && isValidObjectId(f.serif)
          ? (f.serif as never)
          : undefined;
      }
      if (f.mono !== undefined) {
        families.mono = f.mono && isValidObjectId(f.mono)
          ? (f.mono as never)
          : undefined;
      }
      if (f.display !== undefined) {
        families.display = f.display && isValidObjectId(f.display)
          ? (f.display as never)
          : undefined;
      }
      if (f.handwriting !== undefined) {
        families.handwriting = f.handwriting && isValidObjectId(f.handwriting)
          ? (f.handwriting as never)
          : undefined;
      }

      ds.typography = ds.typography ?? { families: {}, sizes: [], weights: [] };
      ds.typography.families = families;
    }

    // sizes
    if (input.sizes) {
      ds.typography = ds.typography ?? { families: {}, sizes: [], weights: [] };
      ds.typography.sizes = input.sizes
        .filter(isValidObjectId)
        .map(s => s as never);
    }

    // weights
    if (input.weights) {
      ds.typography = ds.typography ?? { families: {}, sizes: [], weights: [] };
      ds.typography.weights = input.weights
        .filter(isValidObjectId)
        .map(w => w as never);
    }

    await ds.save();

    // reload populate
    const fresh = await DesignSystem.findById(ds._id)
      .populate("typography.families.sans")
      .populate("typography.families.serif")
      .populate("typography.families.mono")
      .populate("typography.families.display")
      .populate("typography.families.handwriting")
      .populate("typography.sizes")
      .populate("typography.weights")
      .lean();

    return Response.json({ success: true, data: fresh });
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json(
        { success: false, message: "Validation failed", errors: err.flatten() },
        { status: 422 }
      );
    }
    console.error("[PATCH DS typography]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =====================================================================
   Import در api side — برای populate presets
   ===================================================================== */

// این import ها استفاده نمی‌شن، فقط برای register در mongoose
void FontFamily;
void FontSize;
void FontWeight;