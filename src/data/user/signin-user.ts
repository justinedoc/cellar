import API from "@/lib/axios";
import { parseAxiosError } from "@/lib/handle-axios-error";
import { SignInForm as UserSignIn } from "@/lib/schemas/auth/signin";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

type SignInResponse = { success: boolean; message: string };

export async function signInUser(data: UserSignIn): Promise<SignInResponse> {
  try {
    const config = { skipAuthRefresh: true } as AxiosAuthRefreshRequestConfig;

    const { data: response } = await API.post<SignInResponse>(
      "/auth/login",
      { ...data, email: data.bayUserId },
      config,
    );
    return response;
  } catch (error) {
    const parsed = parseAxiosError(error);
    console.error("Login error:", parsed);
    return { success: false, message: parsed.message };
  }
}
