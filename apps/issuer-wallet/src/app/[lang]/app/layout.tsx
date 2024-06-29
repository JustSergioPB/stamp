"use client";

import Sidebar, { NavLink } from "@components/stamp/sidebar";
import { ReactNode } from "react";
import { Braces, PenTool } from "lucide-react";
import Banner from "@components/stamp/banner";

type Props = {
  children: ReactNode;
  params: { lang: string };
};

export default function Layout({ children, params: { lang } }: Props) {
  const BASE_ROUTE = `/${lang}/app`;

  const NAV_LINKS: NavLink[] = [
    {
      title: "templates",
      icon: Braces,
      href: `${BASE_ROUTE}/templates`,
    },
  ];

  return (
    <main className="h-full overflow-hidden flex">
      <Sidebar
        className="basis-64 shrink-0"
        lang={lang}
        links={NAV_LINKS}
        dictionary="sidebar"
        header={<Banner className="mt-4 mb-10" />}
      />
      <div className="h-full basis-auto grow shrink-0">{children}</div>
    </main>
  );
}
