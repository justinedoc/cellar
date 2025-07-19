import "axios";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

declare module "axios" {
  export interface AxiosRequestConfig extends AxiosAuthRefreshRequestConfig {}
}
