"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateBay = z.object({
  email: z.string().email(),
  companyName: z.string().min(1, {
    message: "Company name is required",
  }),
});

type TCreateBay = z.infer<typeof CreateBay>;

function CreateBayForm() {
  const form = useForm<TCreateBay>({
    resolver: zodResolver(CreateBay),
    defaultValues: {
      email: "",
      companyName: "",
    },
  });

  function onSubmit(values: TCreateBay) {
    console.log(values);
  }

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
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
            disabled={form.formState.isSubmitting}
          >
            Create
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
    </CardContent>
  );
}

export default CreateBayForm;
