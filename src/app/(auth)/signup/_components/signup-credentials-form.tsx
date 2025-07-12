"use client";

import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    SignUpCredentialsFields,
    TSignUpCredentialsSchema,
} from "./forms-wrapper";

function validatePassword(password: string) {
  return [
    {
      message: "One special character",
      isChecked: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      message: "6 or more characters",
      isChecked: password.length >= 6,
    },
  ];
}

function SignUpCredentialsForm({
  onHandlePrevStep,
  onSubmit,
}: {
  onHandlePrevStep: VoidFunction;
  onSubmit: (data: TSignUpCredentialsSchema) => void;
}) {
  const form = useFormContext<TSignUpCredentialsSchema>();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const passwordValue = form.watch("password");
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold md:text-3xl">
          Sign Up
        </CardTitle>
        <CardDescription className="font-base">
          Create account and Deploy in seconds
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {SignUpCredentialsFields.slice(0, 2).map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name as keyof TSignUpCredentialsSchema}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{f.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={f.type}
                        placeholder={f.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordHidden ? "password" : "text"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <span
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-sm"
                        onClick={() => setIsPasswordHidden((cur) => !cur)}
                      >
                        {isPasswordHidden ? <Eye /> : <EyeOff />}
                      </span>
                    </div>
                  </FormControl>

                  {/* Password Checks */}
                  {passwordValue && (
                    <PasswordChecks
                      password={passwordValue}
                      checks={validatePassword}
                    />
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button
                size="lg"
                variant={"outline"}
                onClick={onHandlePrevStep}
                className="rounded-full"
              >
                <ChevronLeft /> Back
              </Button>
              <Button
                size="lg"
                disabled={form.formState.isSubmitting}
                type="submit"
                className="rounded-full"
              >
                {form.formState.isSubmitting ? "Signing up..." : "SignUp"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}

interface PasswordType {
  message: string;
  isChecked: boolean;
}
interface PasswordChecksType {
  password: string;
  checks: (password: string) => PasswordType[];
}

function PasswordChecks({ password, checks }: PasswordChecksType) {
  return (
    <div className="mt-4 space-y-2">
      {checks(password).map(({ message, isChecked }) => (
        <div
          key={message}
          className={cn("flex items-center gap-3", {
            "text-green-500": isChecked,
            "text-destructive": !isChecked,
          })}
        >
          {isChecked ? <Check /> : <X />}
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
}

export default SignUpCredentialsForm;
