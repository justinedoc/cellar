"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { HelpCircle, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentType } from "react";
import { Button } from "../../ui/button";

type TItem = {
  title: string;
  content: string;
  icon: ComponentType;
  to: string;
};

export const resourcesNavItems: TItem[] = [
  {
    title: "Blog",
    content: "Read Our Latest Updates and articles",
    icon: Newspaper,
    to: "/blogs",
  },
  {
    title: "Support",
    content: "Get help with any issues you may have",
    icon: HelpCircle,
    to: "/help",
  },
];

export default function NavMenu() {
  return (
    <NavigationMenu
      viewport={false}
      className="text-muted-foreground hidden md:flex"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">What's Cooking?</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid min-w-[30rem] grid-cols-2 gap-4">
              <div className="to-background/10 flex flex-col justify-end rounded-sm bg-gradient-to-tr from-black/30 p-2">
                <Image
                  src="/icons/cellar-logo.svg"
                  alt="Description"
                  width={100}
                  height={100}
                />
                <p className="text-muted-foreground mt-2 text-sm">
                  Gateway to information designed to keep you informed.
                </p>
              </div>

              <div>
                {resourcesNavItems.map((item) => (
                  <Item key={item.title} {...item} />
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[20rem] grid-cols-2 gap-4 md:w-[30rem]">
              {resourcesNavItems.map((item) => (
                <Item key={item.title} {...item} />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function Item({ title, content, icon: Icon, to }: TItem) {
  return (
    <Link href={to}>
      <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md p-3 text-sm">
        <Button size="icon" variant="outline">
          <Icon />
        </Button>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-muted-foreground">{content}</p>
        </div>
      </div>
    </Link>
  );
}
