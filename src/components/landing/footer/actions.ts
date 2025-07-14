"use server";

import { z, ZodError } from "zod/v4";

const SubscribeSchema = z.object({
  email: z.email("Please provide a valid email address"),
});

export async function subscribeToNewsLetter(
  formData: FormData,
): Promise<{ message: string; success: boolean }> {
  try {
    const data = Object.fromEntries(formData.entries());

    const { email } = SubscribeSchema.parse(data);

    console.log("✅ Email:", email);

    return { success: true, message: "You're subscribed!" };
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        success: false,
        message: z.prettifyError(err),
      };
    }

    return {
      success: false,
      message: (err as Error).message || "Oops, Something went wrong",
    };
  }
}
