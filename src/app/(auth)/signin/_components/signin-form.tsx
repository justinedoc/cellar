"use client";

import { Button } from "@/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  SignInFormSchema,
  SignInForm as TSignInForm,
} from "@/lib/schemas/auth/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { resendOTP, signInUser, verifyOTP } from "../actions";

const OTPFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type TOTPForm = z.infer<typeof OTPFormSchema>;
type TFormTabs = "form-details" | "form-otp";

function SignInForm() {
  const [tab, setTab] = useState<TFormTabs>("form-details");

  function handleTabSwitch(value: TFormTabs) {
    setTab(value);
  }

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value as TFormTabs)}>
      <TabsList className="hidden">
        <TabsTrigger value="form-details">Form Details</TabsTrigger>
        <TabsTrigger value="form-otp">Form OTP</TabsTrigger>
      </TabsList>

      <TabsContent value="form-details">
        <FormDetails onHandleTabSwitch={handleTabSwitch} />
      </TabsContent>

      <TabsContent value="form-otp">
        <FormOTP />
      </TabsContent>
    </Tabs>
  );
}

function FormDetails({
  onHandleTabSwitch,
}: {
  onHandleTabSwitch: (value: TFormTabs) => void;
}) {
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
      onHandleTabSwitch("form-otp");
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
          {isPending ? "Signing in..." : "SignIn"}
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

function FormOTP() {
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isResendPending, startResendTransition] = useTransition();
  const router = useRouter();

  const OTPForm = useForm<TOTPForm>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("otp_cooldown_expires_at");
    if (saved) {
      const expiresAt = Number(saved);
      const now = Date.now();
      const remaining = Math.ceil((expiresAt - now) / 1000);

      if (remaining > 0) {
        setResendCooldown(remaining);
      }
    }
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          localStorage.removeItem("otp_cooldown_expires_at");
          clearInterval(timer);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  function onSubmitOTP(data: TOTPForm) {
    startTransition(async () => {
      const { message, success } = await verifyOTP(Number(data.pin));

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      router.push("/");
    });
  }

  function handleResendOTP() {
    if (resendCooldown > 0) return;

    startResendTransition(async () => {
      const { success, message } = await resendOTP();

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);

      const expiresAt = Date.now() + 30_000;
      localStorage.setItem("otp_cooldown_expires_at", expiresAt.toString());
      setResendCooldown(30);
    });
  }

  return (
    <Form {...OTPForm}>
      <form onSubmit={OTPForm.handleSubmit(onSubmitOTP)} className="space-y-6">
        <FormField
          control={OTPForm.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormDescription>
                Didn't receive it?
                <Button
                  variant={"link"}
                  type="button"
                  disabled={isResendPending || resendCooldown > 0}
                  onClick={handleResendOTP}
                  className="text-foreground disabled:text-foreground/50 px-1 font-medium underline disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : isResendPending
                      ? "Resending..."
                      : "Resend OTP"}
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size={"lg"}
          className="rounded-full"
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
