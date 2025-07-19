import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const SelectNative = ({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) => {
  return (
    <div className="relative flex">
      <select
        data-slot="select-native"
        className={cn(
          "peer border-input text-foreground has-[option[disabled]:checked]:text-muted-foreground inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          props.multiple
            ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
            : "h-9 ps-3 pe-8",
          "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[2px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

          className,
        )}
        {...props}
      >
        {children}
      </select>
      {!props.multiple && (
        <span className="text-muted-foreground/80 peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      )}
    </div>
  );
};

export { SelectNative };
