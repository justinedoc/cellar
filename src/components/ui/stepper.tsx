import { cn } from "@/lib/utils"; // Assuming you're using shadcn/ui
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export type StepperProps = {
  stepsNum: number;
  currentStep: number;
  className?: string;
};

export function Stepper({ stepsNum, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex w-full items-center", className)}>
      {Array.from({ length: stepsNum }, (_, index) => {
        const stepIndex = index + 1;
        const isCompleted = stepIndex < currentStep;
        const isActive = stepIndex === currentStep;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                  {
                    "border-primary bg-primary": isCompleted,
                    "border-primary bg-primary/10": isActive,
                    "border-muted-foreground bg-muted":
                      !isActive && !isCompleted,
                  },
                )}
                layout
                transition={{ duration: 0.3 }}
              >
                {/* Icon is now properly centered and colored */}
                <div
                  className={cn("text-2xl font-bold font-base", {
                    "text-primary-foreground": isCompleted,
                    "text-primary": isActive,
                    "text-muted-foreground": !isCompleted && !isActive,
                  })}
                >
                  {index + 1}
                </div>
              </motion.div>
            </div>

            {/* Connector Line */}
            {index < stepsNum - 1 && (
              <div className="relative flex-1">
                <div className="bg-muted absolute top-1/2 h-0.5 w-full -translate-y-1/2" />
                <AnimatePresence>
                  {isCompleted && (
                    <motion.div
                      className="bg-primary absolute top-1/2 h-0.5 w-full -translate-y-1/2"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1, originX: 0 }}
                      exit={{ scaleX: 0, originX: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
