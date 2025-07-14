"use client";

import CreateBayForm from "@/app/(auth)/create-bay/_components/create-bay-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function CreateBayModal() {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[25rem]">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl font-bold md:text-3xl">
            Create a Bay
          </DialogTitle>
          <DialogDescription>
            Create a Bay and keep your team together
          </DialogDescription>
        </DialogHeader>
        <CreateBayForm />
      </DialogContent>
    </Dialog>
  );
}

export default CreateBayModal;
