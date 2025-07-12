"use client";
import FormsWrapper from "@/app/(auth)/signup/_components/forms-wrapper";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

function SignUpModal() {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="px-0 sm:w-[28rem]">
        <FormsWrapper />
      </DialogContent>
    </Dialog>
  );
}

export default SignUpModal;
