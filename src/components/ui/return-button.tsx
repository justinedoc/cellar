"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

function ReturnButton({
  isLink = false,
  className,
  children,
}: {
  isLink?: boolean;
  className?: ClassValue;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      className={cn("absolute top-2 left-2 z-[200] rounded-sm", className)}
      size="icon"
      onClick={!isLink ? () => router.back() : undefined}
    >
      {children || <ChevronLeft />}
    </Button>
  );
}

export default ReturnButton;
