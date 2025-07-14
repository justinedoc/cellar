import z from "zod";

export const SignupDetailsSchema = z.object({
  fullName: z.string().min(1, { message: "Fullname is required" }),
  email: z.string().email("Please enter a valid email address"),
  bayID: z.string().min(1, { message: "Bay ID is required" }),
  bayUserTag: z.string().min(1, { message: "Bay User Tag is required" }),
});

export const SignUpCredentialsSchema = z.object({
  businessMobile: z
    .string()
    .min(10, "Business Mobile must be at least 10 characters long"),
  proPositions: z.string().min(1, { message: "Professional Position is required" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignupSchema = SignupDetailsSchema.merge(SignUpCredentialsSchema);

export type TSignupUser = z.infer<typeof SignupSchema>;
export type TSignupDetailsSchema = z.infer<typeof SignupDetailsSchema>;
export type TSignUpCredentialsSchema = z.infer<typeof SignUpCredentialsSchema>;
