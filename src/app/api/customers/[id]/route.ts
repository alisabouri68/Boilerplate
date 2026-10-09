import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { connectDB } from "@/lib/db/connect";
import { customerService } from "@/lib/services/customer.service";
import { updateCustomerSchema } from "@/lib/validations/customer";
import { AppError } from "@/lib/errors/app-error";

type Params = { params: Promise<{ id: string }> };

/* =====================================================================
   GET — single (with projects)
   ===================================================================== */

export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const customer = await customerService.getByIdWithProjects(id);
    return Response.json({ success: true, data: customer });
  } catch (err) {
    return handleError(err, "GET /api/customers/[id]");
  }
}

/* =====================================================================
   PATCH — update
   ===================================================================== */

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const input = updateCustomerSchema.parse(body);
    const updated = await customerService.update(id, input);

    return Response.json({ success: true, data: updated });
  } catch (err) {
    return handleError(err, "PATCH /api/customers/[id]");
  }
}

/* =====================================================================
   DELETE — cascade
   ===================================================================== */

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const result = await customerService.delete(id);
    return Response.json({ success: true, data: result });
  } catch (err) {
    return handleError(err, "DELETE /api/customers/[id]");
  }
}

/* =====================================================================
   Shared error handler
   ===================================================================== */

function handleError(err: unknown, label: string) {
  if (err instanceof ZodError) {
    return Response.json(
      { success: false, message: "Validation failed", errors: err.flatten() },
      { status: 422 }
    );
  }
  if (err instanceof AppError) {
    return Response.json(
      { success: false, message: err.message, code: err.code },
      { status: err.statusCode }
    );
  }
  console.error(`[${label}]`, err);
  return Response.json(
    {
      success: false,
      message: err instanceof Error ? err.message : "Internal server error",
    },
    { status: 500 }
  );
}