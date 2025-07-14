"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInUser } from "../actions";
import { SignInForm as TSignInForm, SignInFormSchema } from "@/lib/schemas/auth/signin";

function SignInForm() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TSignInForm>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
    defaultValues: {
      bayUserId: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: TSignInForm) {
    startTransition(async () => {
      const { message, success } = await signInUser(values);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="bayUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bay user ID</FormLabel>
              <FormControl>
                <Input placeholder="your bay ID" {...field} />
              </FormControl>
              <FormDescription className="font-base">
                Don't have one?
                <Link href="/create-bay">
                  <Button
                    variant="link"
                    className="text-foreground/90 gap-0.5 has-[>svg]:px-1"
                  >
                    create a bay <ArrowUpRight />
                  </Button>
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="-mt-4 flex items-center justify-between text-sm">
          <Link href={"/forgot-password"}>
            <Button size="sm" variant="link" className="text-muted-foreground">
              Forgot password?
            </Button>
          </Link>

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse items-center">
                <FormLabel>Remember me</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="rounded-full"
          disabled={isPending}
        >
          {isPending ? "Signining..." : "SignIn"}
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup">
            <Button variant={"link"} className="text-foreground px-1">
              Create one
            </Button>
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default SignInForm;
