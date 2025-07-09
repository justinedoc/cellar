import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

function Banner({ ...props }: ComponentProps<"section">) {
  return <section {...props} className={cn("", props.className)} />;
}
