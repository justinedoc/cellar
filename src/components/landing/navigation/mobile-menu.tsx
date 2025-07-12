"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flame, Home, Layers3, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { resourcesNavItems } from "./nav-menu";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const variants = {
    open: { opacity: 1, y: 20 },
    closed: { opacity: 0, y: 0 },
  };

  return (
    <div
      ref={navRef}
      className={cn(
        "bg-background absolute top-14 left-0 z-[200] flex h-[calc(100vh-3rem)] w-full rounded-md p-4 backdrop-blur-2xl",
        isOpen ? "flex" : "hidden",
      )}
    >
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        className="flex w-full flex-col justify-start"
      >
        <ul className="flex w-full flex-1 flex-col items-start space-y-3">
          <li onClick={() => setIsOpen(false)}>
            <Link
              href="/"
              className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-4 py-2 text-lg font-medium"
            >
              <Home className="h-5 w-5" /> Home
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link
              href="/"
              className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-4 py-2 text-lg font-medium"
            >
              <Flame className="h-5 w-5" /> What's Cooking?
            </Link>
          </li>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features" className="border-none">
              <AccordionTrigger className="hover:text-muted-foreground px-4 py-2 text-lg font-medium">
                <span className="flex items-center">
                  <LayoutDashboard className="mr-2 h-5 w-5" /> Features
                </span>
              </AccordionTrigger>
              <AccordionContent
                onClick={() => setIsOpen(false)}
                className="mt-1 flex flex-col items-start gap-1"
              >
                {resourcesNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.to}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-4 py-2 text-lg"
                  >
                    <item.icon /> {item.title}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="resources" className="border-none">
              <AccordionTrigger className="hover:text-muted-foreground px-4 py-2 text-lg font-medium">
                <span className="flex items-center">
                  <Layers3 className="mr-2 h-5 w-5" /> Resources
                </span>
              </AccordionTrigger>
              <AccordionContent
                onClick={() => setIsOpen(false)}
                className="mt-1 flex flex-col items-start gap-1"
              >
                {resourcesNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.to}
                    className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-4 py-2 text-lg"
                  >
                    <item.icon /> {item.title}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ul>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
