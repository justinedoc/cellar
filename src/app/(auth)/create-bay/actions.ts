"use server";

import { handleServerActionError } from "@/lib/handle-server-error";
import { CreateBay, CreateBaySchema } from "@/lib/schemas/bay/create-bay";
import { sleep } from "@/lib/sleep";
import { ErrorResponse } from "@/types/error-types";
import { ServerActionResponse } from "@/types/server-action-types";

export async function createBay(
  details: CreateBay,
): Promise<ServerActionResponse | ErrorResponse> {
  try {
    const validDetails = CreateBaySchema.parse(details);
    await sleep(3000);

    console.log("valid details: ", validDetails);

    return {
      success: true,
      message: "Bay creation successful",
    };
  } catch (err) {
    return handleServerActionError(err);
  }
}
