"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInFormSchema = z.object({
  bayUserId: z.string().min(2, {
    message: "Bay user ID must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long",
  }),
  rememberMe: z.boolean().optional(),
});

type TSignInFormSchema = z.infer<typeof SignInFormSchema>;

function SignInForm({ ...props }: ComponentProps<typeof Card>) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const form = useForm<TSignInFormSchema>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      bayUserId: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: TSignInFormSchema) {
    console.log(values);
  }

  return (
    <Card
      {...props}
      className={cn(
        "bg-transparent backdrop-blur-2xl w-full sm:w-auto sm:min-w-[25rem]",
        props.className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold md:text-3xl">
          Sign In
        </CardTitle>
        <CardDescription className="font-base">
          Heyy! Welcome Back
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                <Button
                  size="sm"
                  variant="link"
                  className="text-muted-foreground"
                >
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
              disabled={form.formState.isSubmitting}
            >
              SignIn
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Don't have an account?{" "}
              <Link href="signup">
                <Button variant={"link"} className="text-foreground px-1">
                  Create one
                </Button>
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignInForm;
