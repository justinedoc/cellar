export type ErrorResponse = {
  success: false;
  message: string;
  error?: Record<string, string>;
};