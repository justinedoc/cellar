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
    <Dialog defaultOpen onOpenChange={() => router.push("/")}>
      <DialogContent className="sm:max-w-[25rem]">
        <DialogHeader className="text-left">
          <DialogTitle className="font-bold text-3xl">
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
