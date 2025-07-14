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
import { useFormContext } from "react-hook-form";
import {
  SignupDetailsFields,
  TSignupDetailsSchema,
} from "./signup-forms-wrapper";

function SignUpDetailsForm({
  onSubmit,
}: {
  onSubmit: (data: TSignupDetailsSchema) => void;
}) {
  const form = useFormContext<TSignupDetailsSchema>();
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {SignupDetailsFields.slice(0, 2).map((f) => (
            <FormField
              key={f.name}
              control={form.control}
              name={f.name as keyof TSignupDetailsSchema}
              render={({ field }) => (
                <FormItem className="relative">
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

          <div className="flex w-full flex-col gap-6 md:gap-4 md:flex-row">
            {SignupDetailsFields.slice(2).map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name as keyof TSignupDetailsSchema}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{f.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={f.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button type="submit" size="lg" className="rounded-full">
            Next
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}

export default SignUpDetailsForm;
