import { ErrorResponse } from "@/types/error-types";
import { ZodError } from "zod/v4";
import { handleZodError } from "./handle-zod-error";

export function handleServerActionError(err: unknown): ErrorResponse {
  if (err instanceof ZodError) {
    const { error, message } = handleZodError(err);
    console.error("🧩 Validation Error:", error);
    return {
      success: false,
      message,
      error,
    };
  }

  console.error("🚨 Unhandled Error in server action:", err);

  return {
    success: false,
    message:
      (err as Error)?.message ||
      "Something went wrong. Please try again later.",
  };
}
