import Link from "next/link";
import Logo from "../../globals/logo";
import { Separator } from "../../ui/separator";
import SubscribeForm from "./subscribe-form";

const footerLinks = [
  {
    text: "Feed",
    link: "/feed",
  },
  {
    text: "CoolExpx",
    link: "/coolexpx",
  },
  {
    text: "Support",
    link: "/support",
  },
];

function Footer() {
  return (
    <footer className="text-muted-foreground mt-auto border-t px-4 py-4 md:px-25">
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3 md:gap-0 md:py-4">
        <Logo className="size-30" />

        <div className="space-x-4">
          {footerLinks.map((link) => (
            <Link
              key={link.text}
              href={link.link}
              className="hover:text-foreground transition-all"
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="space-y-2">
          <h2 className="text-foreground text-xl font-semibold">
            Enter your email to stay{" "}
            <span className="text-muted-foreground">Updated!</span>
          </h2>

          <SubscribeForm />
        </div>
      </div>

      <Separator className="bg-muted" />

      <div className="flex flex-col justify-between gap-3 py-4 text-xs md:flex-row">
        <span>© 2025 Cellar. All rights reserved.</span>

        <div className="flex gap-2">
          <Link href="/terms" className="hover:underline">
            Terms &amp; conditions
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
