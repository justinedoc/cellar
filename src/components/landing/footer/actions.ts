"use server";

import { handleServerActionError } from "@/lib/handle-server-error";
import { ErrorResponse } from "@/types/error-types";
import { ServerActionResponse } from "@/types/server-action-types";
import { z } from "zod/v4";

const SubscribeSchema = z.object({
  email: z.email("Please provide a valid email address"),
});

export async function subscribeToNewsLetter(
  formData: FormData,
): Promise<ServerActionResponse | ErrorResponse> {
  try {
    const data = Object.fromEntries(formData.entries());

    const { email } = SubscribeSchema.parse(data);

    console.log("✅ Email:", email);

    return { success: true, message: "You're subscribed!" };
  } catch (err) {
    return handleServerActionError(err);
  }
}
