import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }: { className?: ClassValue }) {
  return (
    <Link href={"/"}>
      <Image
        src="/icons/cellar-logo.svg"
        alt="Cellar"
        priority
        width={90}
        height={90}
        className={cn(className)}
      />
    </Link>
  );
}

export default Logo;
