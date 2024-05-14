"use client";

import { Sidebar } from "@components/stamp/sidebar";
import { ReactNode } from "react";
import { NAV_LINKS } from "./nav-links";

type Props = {
  children: ReactNode;
  params: { lang: string };
};

export default function AppLayout({ children, params: { lang } }: Props) {
  return (
    <main className="h-full overflow-hidden flex">
      <Sidebar lang={lang} links={NAV_LINKS} className="basis-64" />
      <div className="h-full basis-auto grow shrink-0 p-10">{children}</div>
    </main>
  );
}
