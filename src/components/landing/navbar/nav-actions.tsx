"use client";

import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideProps, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./mobile-menu";

function NavActions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box className="gap-2 md:gap-4">
        <Link passHref href={"/signin"}>
          <Button size="sm" variant={"outline"}>
            Sign in
          </Button>
        </Link>

        <Link passHref href="/signup">
          <Button size="sm" className="group hidden md:flex">
            Sign up
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen((prev) => !prev)}
          className="z-[100] size-8 p-2 md:hidden"
        >
          {isOpen ? (
            <XIcon className="size-4 duration-300" />
          ) : (
            <Menu className="size-3.5 duration-300" />
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
