import { parseAxiosError } from "@/lib/handle-axios-error";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { toast } from "sonner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";

const REFRESH_PATH = "/cd-gaa/n7yidnyisds/refresh-token";

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 60_000,
});

async function refreshAuthLogic(failedRequest: any) {
  try {
    await API.post<{ success: boolean }>("/refresh");
    return Promise.resolve();
  } catch (error) {
    const parsed = parseAxiosError(error);
    console.error("Refresh token error:", parsed);
    toast.error(parsed.message || "Session expired. Please sign in again.");

    window.location.href = "/signin";
    return Promise.reject(error);
  }
}

createAuthRefreshInterceptor(API, refreshAuthLogic, {
  statusCodes: [401, 403],
});

export default API;
