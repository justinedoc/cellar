"use server";

import { handleServerActionError } from "@/lib/handle-server-error";
// import { type SignInForm, SignInFormSchema } from "@/lib/schemas/auth/signin";
import { sleep } from "@/lib/sleep";
import { ErrorResponse } from "@/types/error-types";
import { ServerActionResponse } from "@/types/server-action-types";

// export async function signInUser(
//   user: SignInForm,
// ): Promise<ServerActionResponse | ErrorResponse> {
//   try {
//     const validUser = SignInFormSchema.parse(user);

//     //TODO: Signin logic here
//     await sleep();

//     console.log("valid user: ", validUser);

//     return {
//       success: true,
//       message: "Signin successful",
//     };
//   } catch (err) {
//     return handleServerActionError(err);
//   }
// }

export async function verifyOTP(
  pin: number,
): Promise<ServerActionResponse | ErrorResponse> {
  try {
    //TODO: OTP verification logic here

    await sleep();

    console.log("opt pin: ", pin);

    return {
      success: true,
      message: "OTP verification successful",
    };
  } catch (err) {
    return handleServerActionError(err);
  }
}

let RETRY_ATTEMPTS = 3;

export async function resendOTP(): Promise<
  ServerActionResponse | ErrorResponse
> {
  try {
    //TODO: OTP resend logic here

    if (RETRY_ATTEMPTS <= 0) throw new Error("Retry attempts limit reached");

    await sleep();
    RETRY_ATTEMPTS -= 1;

    console.log("Resending otp...");

    return {
      success: true,
      message: "OTP resent successfully.",
    };
  } catch (err) {
    return handleServerActionError(err);
  }
}
