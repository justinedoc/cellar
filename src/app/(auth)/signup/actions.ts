"use server";

import { handleServerActionError } from "@/lib/handle-server-error";
import { SignupSchema, TSignupUser } from "@/lib/schemas/auth/signup";
import { sleep } from "@/lib/sleep";
import { ErrorResponse } from "@/types/error-types";
import { ServerActionResponse } from "@/types/server-action-types";

export async function signupUser(
  user: TSignupUser,
): Promise<ServerActionResponse | ErrorResponse> {
  try {
    const validUser = SignupSchema.parse(user);

    //TODO: Signup logic goes here
    await sleep();

    console.log("valid user: ", validUser);

    return {
      success: true,
      message: "Account creation successful",
    };
  } catch (err) {
    return handleServerActionError(err);
  }
}
