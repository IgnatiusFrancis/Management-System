//presentation/errors/conflict-error.ts

import { AppError } from "./base-error";
import { ErrorType } from "./error-types";

export class ConflictError extends AppError {
  constructor(options: {
    message?: string;
    resource?: string;
    code?: string;
    metadata?: Record<string, any>;
  }) {
    super({
      type: ErrorType.CONFLICT,
      statusCode: 409,
      message:
        options.message ||
        `Resource already exists: ${options.resource || "Unknown"}`,
      code: options.code || "RESOURCE_CONFLICT",
      target: options.resource,
      metadata: options.metadata,
    });
  }
}
