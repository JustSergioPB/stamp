import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { dir } from "i18next";
import { cn } from "@lib/utils";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issuer Wallet",
  description: "Certify documents in the easiest way possible.",
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <body className={cn(inter.className, "h-screen overflow-hidden")}>{children}</body>
    </html>
  );
}
