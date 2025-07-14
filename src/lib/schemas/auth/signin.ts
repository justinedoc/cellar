import z from "zod";

export const SignInFormSchema = z.object({
  bayUserId: z.string(),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }),
  rememberMe: z.boolean().optional(),
});

// Please provide a valid email address

export type SignInForm = z.infer<typeof SignInFormSchema>;
