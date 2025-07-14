"use client";

import SignInForm from "@/app/(auth)/signin/_components/signin-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function SignInModal() {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[25rem]">
        <DialogHeader className="text-left">
          <DialogTitle className=" font-bold text-3xl">
            Sign In
          </DialogTitle>
          <DialogDescription>
            Welcome back! Let's finish where we left off
          </DialogDescription>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}

export default SignInModal;
