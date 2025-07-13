"use client";

import SignUpFormsWrapper from "@/app/(auth)/signup/_components/signup-forms-wrapper";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

function SignUpModal() {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="px-0 sm:w-[28rem]">
        <SignUpFormsWrapper />
      </DialogContent>
    </Dialog>
  );
}

export default SignUpModal;
