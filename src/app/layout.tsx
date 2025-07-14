import { Toaster } from "@/components/ui/sonner";
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cellar",
  description:
    "Unify your organization's knowledge and execution in one intelligent, real-time workspace.",
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "dark font-heading antialiased",
          base.variable,
          heading.variable,
        )}
      >
        {children}
        <Toaster richColors theme="dark" position="top-right" />
        {modal}
      </body>
    </html>
  );
}
