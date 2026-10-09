import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { connectDB } from "@/lib/db/connect";
import { projectService } from "@/lib/services/project.service";
import { createProjectSchema } from "@/lib/validations/project";
import { AppError } from "@/lib/errors/app-error";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const result = await projectService.listByCustomer(id);
    return Response.json({ success: true, data: result });
  } catch (err) {
    return handleError(err, "GET /api/customers/[id]/projects");
  }
}

export async function POST(req: NextRequest, { params }: Params) {
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

    const input = createProjectSchema.parse(body);
    const created = await projectService.create(id, input);

    return Response.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    return handleError(err, "POST /api/customers/[id]/projects");
  }
}

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
    { success: false, message: "Internal server error" },
    { status: 500 }
  );
}