/* =====================================================================
   Base Error
   ===================================================================== */

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    code: string,
    statusCode: number,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

/* =====================================================================
   Specific Errors
   ===================================================================== */

/** 404 — منبع پیدا نشد */
export class NotFoundError extends AppError {
  constructor(resource = "منبع", details?: unknown) {
    super(`${resource} پیدا نشد`, "NOT_FOUND", 404, details);
  }
}

/** 409 — تضاد (مثلاً ایمیل تکراری) */
export class ConflictError extends AppError {
  constructor(message = "تضاد در داده", details?: unknown) {
    super(message, "CONFLICT", 409, details);
  }
}

/** 422 — داده نامعتبر (منطق کسب‌وکار) */
export class ValidationError extends AppError {
  constructor(message = "داده نامعتبر است", details?: unknown) {
    super(message, "VALIDATION_ERROR", 422, details);
  }
}

/** 400 — درخواست بد */
export class BadRequestError extends AppError {
  constructor(message = "درخواست نامعتبر است", details?: unknown) {
    super(message, "BAD_REQUEST", 400, details);
  }
}

/** 403 — دسترسی مجاز نیست */
export class ForbiddenError extends AppError {
  constructor(message = "دسترسی مجاز نیست", details?: unknown) {
    super(message, "FORBIDDEN", 403, details);
  }
}

/** 401 — احراز هویت لازم است */
export class UnauthorizedError extends AppError {
  constructor(message = "احراز هویت لازم است", details?: unknown) {
    super(message, "UNAUTHORIZED", 401, details);
  }
}