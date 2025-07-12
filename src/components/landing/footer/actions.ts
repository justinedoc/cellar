"use server";

import { z } from "zod/v4";

const SubscribeSchema = z.object({
  email: z.email("Invalid email address"),
});

export async function subscribeToNewsLetter(
  formData: FormData,
): Promise<{ error: null | string; success: boolean }> {
  const data = Object.fromEntries(formData.entries());

  const result = SubscribeSchema.safeParse(data);

  if (!result.success) {
    return {
      error: z.prettifyError(result.error),
      success: false,
    };
  }

  const { email } = result.data;

  console.log("✅ Email:", email);

  return { error: null, success: true };
}
