"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Stepper } from "@/components/ui/stepper";
import { sleep } from "@/lib/sleep";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SignUpCredentialsForm from "./signup-credentials-form";
import SignUpDetailsForm from "./signup-details-form";

const SignupDetailsSchema = z.object({
  fullName: z
    .string({ message: "Fullname is required" })
    .min(1, "Fullname is required"),
  email: z.string().email("Please enter a valid email address"),
  bayID: z
    .string({ message: "Bay ID is required" })
    .min(1, "Bay ID is required"),
  bayUserTag: z
    .string({ message: "Bay User Tag is required" })
    .min(1, "Bay user Tag is required"),
});

export const SignupDetailsFields = [
  {
    name: "fullName",
    label: "Fullname",
    type: "text",
    placeholder: "Enter your fullname...",
  },
  {
    name: "email",
    label: "Company Email",
    type: "email",
    placeholder: "Enter your company email...",
  },
  {
    name: "bayID",
    label: "Bay ID",
    type: "text",
    placeholder: "Enter your bay ID...",
  },
  {
    name: "bayUserTag",
    label: "Bay User Tag",
    type: "text",
    placeholder: "Enter your bay user tag...",
  },
];

export const SignUpCredentialsFields = [
  {
    name: "businessMobile",
    label: "Business Mobile",
    placeholder: "(e.g., +234...)",
    type: "tel",
  },

  {
    name: "proPositions",
    label: "Professional Positions",
    type: "text",
    placeholder: "(e.g Snr Dev...)",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "****",
  },
];

const SignUpCredentialsSchema = z.object({
  businessMobile: z
    .string()
    .min(10, "Business Mobile must be at least 10 characters long"),
  proPositions: z.string({ message: "Professional Position is required" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignupSchema = SignupDetailsSchema.merge(SignUpCredentialsSchema);
export type TSignupUser = z.infer<typeof SignupSchema>;
export type TSignupDetailsSchema = z.infer<typeof SignupDetailsSchema>;
export type TSignUpCredentialsSchema = z.infer<typeof SignUpCredentialsSchema>;

function FormsWrapper() {
  const [formStep, setFormStep] = useState(2);

  const [isPending, startTransition] = useTransition();

  const [signupDetailsData, setSignupDetailsData] =
    useState<TSignupDetailsSchema>({
      email: "",
      fullName: "",
      bayID: "",
      bayUserTag: "",
    });

  const SignupDetailsMethods = useForm<TSignupDetailsSchema>({
    resolver: zodResolver(SignupDetailsSchema),
    defaultValues: {
      email: "",
      fullName: "",
      bayID: "",
      bayUserTag: "",
    },
  });

  const SignUpCredentialsMethods = useForm<TSignUpCredentialsSchema>({
    resolver: zodResolver(SignUpCredentialsSchema),
    defaultValues: {
      businessMobile: "",
      proPositions: "Worker",
      password: "",
    },
  });

  const onSubmitSignupDetailsForm = (data: TSignupDetailsSchema) => {
    setSignupDetailsData(data);
    setFormStep((cur) => cur + 1);
  };

  const handlePrevStep = () => {
    setFormStep((cur) => (cur > 1 ? cur - 1 : cur));
  };

  const onSubmitSignUpCredentialsForm = (data: TSignUpCredentialsSchema) => {
    const finalData: TSignupUser = { ...signupDetailsData, ...data };

    startTransition(async () => {
      try {
        await sleep(3000);
        toast.success("Account Created Successfully!");
        console.log("data:", finalData);
      } catch (error) {
        console.error("Error during submission:", error);
        toast.error((error as Error).message || "An unexpected error occured");
      }
    });
  };

  return (
    <Card
      className={cn("w-full bg-transparent backdrop-blur-2xl sm:w-[28rem]")}
    >
      <Stepper
        stepsNum={2}
        currentStep={formStep}
        className="mx-auto w-[85%] border-b px-8 pb-4 md:px-16"
      />
      {formStep === 1 && (
        <FormProvider {...SignupDetailsMethods}>
          <SignUpDetailsForm onSubmit={onSubmitSignupDetailsForm} />
        </FormProvider>
      )}
      {formStep === 2 && (
        <FormProvider {...SignUpCredentialsMethods}>
          <SignUpCredentialsForm
            onSubmit={onSubmitSignUpCredentialsForm}
            onHandlePrevStep={handlePrevStep}
          />
        </FormProvider>
      )}

      <CardFooter className="mx-auto">
        <p className="text-muted-foreground text-center text-sm">
          Registered?{" "}
          <Link href="/signin">
            <Button variant={"link"} className="text-foreground px-0">
              SignIn
            </Button>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default FormsWrapper;
