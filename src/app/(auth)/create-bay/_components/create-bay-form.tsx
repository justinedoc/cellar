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
import { CreateBay, CreateBaySchema } from "@/lib/schemas/bay/create-bay";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createBay } from "../actions";

function CreateBayForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<CreateBay>({
    resolver: zodResolver(CreateBaySchema),
    defaultValues: {
      email: "",
      companyName: "",
    },
  });

  function onSubmit(values: CreateBay) {
    startTransition(async () => {
      const { message, success } = await createBay(values);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);

      router.push("/signup");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormDescription className="font-base">
                Email of the IT support
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your company's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="rounded-full"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create"}
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          Already have a Bay?{" "}
          <Link href="/signin">
            <Button variant={"link"} className="text-foreground px-1">
              SignIn
            </Button>
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default CreateBayForm;
