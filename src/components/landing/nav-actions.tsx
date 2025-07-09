"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, LucideProps, XIcon } from "lucide-react";
import { useState } from "react";
import Box from "../ui/box";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";

function NavActions() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box>
        <Button size="sm" variant={isMobile ? "secondary" : "outline"}>
          Sign in
        </Button>
        <Button size="sm" className="group hidden md:flex">
          Sign up
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen((prev) => !prev)}
          className="z-[100] h-8 w-8 p-2 md:hidden"
        >
          {isOpen ? (
            <XIcon className="h-4 w-4 duration-300" />
          ) : (
            <Menu className="h-3.5 w-3.5 duration-300" />
          )}
        </Button>
      </Box>

      <MobileMenu setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
}

function Menu(props: LucideProps) {
  return (
    <svg
      {...props}
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 9H15M1 1H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default NavActions;
