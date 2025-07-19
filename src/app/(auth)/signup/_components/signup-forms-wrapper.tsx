"use client";

import { Stepper } from "@/components/ui/stepper";
import {
  SignUpCredentialsSchema,
  SignupDetailsSchema,
  TSignUpCredentialsSchema,
  TSignupDetailsSchema,
  TSignupUser,
} from "@/lib/schemas/auth/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, IdCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signupUser } from "../actions";
import FormFooter from "./form-footer";
import FormHeader from "./form-header";
import SignUpCredentialsForm from "./signup-credentials-form";
import SignUpDetailsForm from "./signup-details-form";

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

function SignUpFormsWrapper({ as }: { as: "card" | "dialog" }) {
  const [formStep, setFormStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [signupDetailsData, setSignupDetailsData] =
    useState<TSignupDetailsSchema>({
      email: "",
      fullName: "",
      bayID: "",
      bayUserTag: "",
    });

  // form methods
  const SignupDetailsMethods = useForm<TSignupDetailsSchema>({
    resolver: zodResolver(SignupDetailsSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      fullName: "",
      bayID: "",
      bayUserTag: "",
    },
  });

  const SignUpCredentialsMethods = useForm<TSignUpCredentialsSchema>({
    resolver: zodResolver(SignUpCredentialsSchema),
    mode: "onChange",
    defaultValues: {
      businessMobile: "",
      businessMobileCountry: "+234",
      proPositions: "Worker",
      password: "",
    },
  });

  const stepIcons = [<CircleUserRound key={1} />, <IdCard key={2} />];

  // handlers
  const onSubmitSignupDetailsForm = (data: TSignupDetailsSchema) => {
    setSignupDetailsData(data);
    setFormStep((cur) => cur + 1);
  };

  const handlePrevStep = () => {
    setFormStep((cur) => (cur > 1 ? cur - 1 : cur));
  };

  const onSubmitSignUpCredentialsForm = (data: TSignUpCredentialsSchema) => {
    const userData: TSignupUser = { ...signupDetailsData, ...data };

    startTransition(async () => {
      const { message, success } = await signupUser(userData);

      if (!success) {
        toast.error(message);
        return;
      }

      console.log(userData);

      toast.success(message);
      router.push("/");
    });
  };

  return (
    <>
      <Stepper
        stepIcons={stepIcons}
        currentStep={formStep}
        className="mx-auto w-[85%] border-b px-8 pb-4 md:px-16"
      />

      {/* Form header */}

      <FormHeader mode={as} />

      {formStep === 1 && (
        <FormProvider {...SignupDetailsMethods}>
          <SignUpDetailsForm onSubmit={onSubmitSignupDetailsForm} />
        </FormProvider>
      )}
      {formStep === 2 && (
        <FormProvider {...SignUpCredentialsMethods}>
          <SignUpCredentialsForm
            isSubmitting={isPending}
            onSubmit={onSubmitSignUpCredentialsForm}
            onHandlePrevStep={handlePrevStep}
          />
        </FormProvider>
      )}

      <FormFooter mode={as} />
    </>
  );
}

export default SignUpFormsWrapper;
