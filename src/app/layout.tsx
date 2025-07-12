import { Toaster } from "@/components/ui/sonner";
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Cellar",
  description: "Collaboration Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
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
        <Toaster richColors />
      </body>
    </html>
  );
}
