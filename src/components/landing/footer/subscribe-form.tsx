"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { FormEvent, useTransition } from "react";
import { toast } from "sonner";
import { subscribeToNewsLetter } from "./actions";

function SubscribeForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const { message, success } = await subscribeToNewsLetter(formData);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-muted flex items-center gap-2 rounded-md border p-2 py-1.5"
    >
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="border-0 focus-visible:ring-0"
      />

      <Button type="submit" size="icon" className="p-2" disabled={isPending}>
        <ChevronRight />
      </Button>
    </form>
  );
}

export default SubscribeForm;
