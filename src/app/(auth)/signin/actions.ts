"use server";

import { handleServerActionError } from "@/lib/handle-server-error";
import { type SignInForm, SignInFormSchema } from "@/lib/schemas/auth/signin";
import { sleep } from "@/lib/sleep";
import { ErrorResponse } from "@/types/error-types";
import { ServerActionResponse } from "@/types/server-action-types";

export async function signInUser(
  user: SignInForm,
): Promise<ServerActionResponse | ErrorResponse> {
  try {
    const validUser = SignInFormSchema.parse(user);

    //TODO: Signin logic goes here
    await sleep();

    console.log("valid user: ", validUser);

    return {
      success: true,
      message: "Signin successful",
    };
  } catch (err) {
    return handleServerActionError(err);
  }
}
