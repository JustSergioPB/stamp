import type { Metadata } from "next";
import "./globals.css";
import { DEFAULT_LOCALE } from "@i18n/constants/default-locale.const";

export const metadata: Metadata = {
  title: "Issuer Wallet",
  description: "Certify documents in the easiest way possible.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang ?? DEFAULT_LOCALE}>
      <body className="h-screen overflow-hidden">{children}</body>
    </html>
  );
}
