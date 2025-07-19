import { isAxiosError } from "axios";

interface ParsedError {
  message: string;
  status?: number;
}

export function parseAxiosError(err: unknown): ParsedError {
  if (isAxiosError(err)) {
    let extractedApiMessage: string | undefined = undefined;
    const responseData = err.response?.data;

    if (
      responseData &&
      typeof responseData === "object" &&
      responseData !== null
    ) {
      if (
        "message" in responseData &&
        typeof responseData.message === "string" &&
        responseData.message
      ) {
        extractedApiMessage = responseData.message;
      } else if (
        "error" in responseData &&
        typeof responseData.error === "string" &&
        responseData.error
      ) {
        extractedApiMessage = responseData.error;
      }
    } else if (typeof responseData === "string" && responseData.trim() !== "") {
      extractedApiMessage = responseData;
    }

    return {
      message: extractedApiMessage || err.message || "Unknown error",
      status: err.response?.status,
    };
  }

  if (err instanceof Error) {
    return {
      message: err.message || "Unknown error",
    };
  }

  return {
    message: "Unknown error",
  };
}
