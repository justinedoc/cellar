import z from "zod";

export const CreateBaySchema = z.object({
  email: z.string().email(),
  companyName: z.string().min(1, {
    message: "Company name is required",
  }),
});

export type CreateBay = z.infer<typeof CreateBaySchema>;
