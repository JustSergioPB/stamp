"use client";

import { Sidebar } from "@components/stamp/sidebar";
import { ReactNode } from "react";
import { NAV_LINKS } from "./nav-links";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <main className="h-full overflow-hidden flex">
      <Sidebar links={NAV_LINKS} className="basis-16" />
      <div className="h-full basis-auto grow shrink-0 bg-neutral-100 p-4">{children}</div>
    </main>
  );
}
