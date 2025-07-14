"use server";

import { handleZodError } from "@/lib/handle-zod-error";
import { type SignInForm, SignInFormSchema } from "@/lib/schemas/auth/signin";
import { sleep } from "@/lib/sleep";
import { ZodError } from "zod/v4";

export async function signInUser(
  user: SignInForm,
): Promise<{ message: string; success: boolean }> {
  try {
    const validUser = SignInFormSchema.parse(user);
    await sleep(3000);

    console.log("valid user: ", validUser);

    return {
      success: true,
      message: "Signin successful",
    };
  } catch (err) {
    if (err instanceof ZodError) {
      const { error, message } = handleZodError(err);

      console.error("Validation error: ", error);

      return {
        success: false,
        message,
      };
    }

    console.error("Error in signin user", err);

    return {
      success: false,
      message: "Something went wrong, Please try again later",
    };
  }
}
