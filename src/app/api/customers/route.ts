import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { connectDB } from "@/lib/db/connect";
import { customerService } from "@/lib/services/customer.service";
import { createCustomerSchema } from "@/lib/validations/customer";
import { AppError } from "@/lib/errors/app-error";

/* =====================================================================
   GET — list with pagination + filters
   ===================================================================== */

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 20);
    const q = searchParams.get("q") ?? undefined;
    const status = searchParams.get("status") ?? undefined;
    const type = searchParams.get("type") ?? undefined;

    const result = await customerService.list({
      page,
      limit,
      q,
      status: status as never,
      type: type as never,
    });

    return Response.json({ success: true, data: result });
  } catch (err) {
    console.error("[GET /api/customers]", err);
    return Response.json(
      { success: false, message: "Failed to load customers" },
      { status: 500 }
    );
  }
}

/* =====================================================================
   POST — create
   ===================================================================== */

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const input = createCustomerSchema.parse(body);
    const created = await customerService.create(input);

    return Response.json({ success: true, data: created }, { status: 201 });
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

    if (err instanceof AppError) {
      return Response.json(
        { success: false, message: err.message, code: err.code },
        { status: err.statusCode }
      );
    }

    console.error("[POST /api/customers]", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}