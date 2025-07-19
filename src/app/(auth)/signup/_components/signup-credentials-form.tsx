"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSignUpCredentialsSchema } from "@/lib/schemas/auth/signup";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SignUpCredentialsFields } from "./signup-forms-wrapper";

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
  isSubmitting,
}: {
  onHandlePrevStep: VoidFunction;
  onSubmit: (data: TSignUpCredentialsSchema) => void;
  isSubmitting: boolean;
}) {
  const form = useFormContext<TSignUpCredentialsSchema>();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const passwordValue = form.watch("password");

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Business Mobile Field */}
          <FormField
            control={form.control}
            name="businessMobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="businessMobile">Business Mobile</FormLabel>
                <FormControl>
                  <div className="border-input flex rounded-md border shadow-xs">
                    <Select {...form.register("businessMobileCountry")}>
                      <SelectTrigger
                        id="businessMobileCountry"
                        className="w-fit rounded-r-none border-0 border-e"
                      >
                        <SelectValue placeholder="+234" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="bg-background" value="+234">
                          +234
                        </SelectItem>
                        <SelectItem className="bg-background" value="+1">
                          +1
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      id={field.name}
                      type="tel"
                      placeholder="80 4978 0956"
                      className="flex-1 rounded-l-none border-none text-sm focus:ring-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Other credential fields */}
          {SignUpCredentialsFields.slice(1, -1).map((f) => (
            <FormField
              key={f.name}
              control={form.control}
              name={f.name as keyof TSignUpCredentialsSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={f.name}>{f.label}</FormLabel>
                  <FormControl>
                    <Input
                      id={f.name}
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

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      type={isPasswordHidden ? "password" : "text"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <button
                      type="button"
                      aria-label={
                        isPasswordHidden ? "Show password" : "Hide password"
                      }
                      className="absolute inset-y-0 right-2 flex items-center text-sm"
                      onClick={() => setIsPasswordHidden((v) => !v)}
                    >
                      {isPasswordHidden ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>

                {/* Password strength/checks */}
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

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={onHandlePrevStep}
              className="rounded-full"
            >
              <ChevronLeft className="mr-2" /> Back
            </Button>
            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="rounded-full"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
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
