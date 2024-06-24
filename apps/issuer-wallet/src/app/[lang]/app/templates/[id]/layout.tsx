import Breadcrumb from "@components/stamp/breadcrumb";
import Sidebar from "@components/stamp/sidebar";
import { buttonVariants } from "@components/ui/button";
import { useTranslation } from "@i18n/server";
import { cn } from "@lib/utils";
import { BreadCrumbItem } from "@models/ui/breadcrumb-item";
import { NavLink } from "@models/ui/nav-link";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  params: { lang: string; id: string };
};

export default async function Layout({
  params: { lang, id },
  children,
}: Props) {
  const { t } = await useTranslation(lang, "actions");
  const BASE_ROUTE = `/${lang}/app/templates/${id}`;

  const NAV_LINKS: NavLink[] = [
    { title: "overview.title", href: `${BASE_ROUTE}` },
    { title: "form.base.title", href: `${BASE_ROUTE}/base` },
    {
      title: "form.content.title",
      href: `${BASE_ROUTE}/content`,
    },
    {
      title: "form.security.title",
      href: `${BASE_ROUTE}/security`,
    },
    {
      title: "form.status.title",
      href: `${BASE_ROUTE}/status`,
    },
    {
      title: "form.validity.title",
      href: `${BASE_ROUTE}/validity`,
    },
  ];

  return (
    <main className="h-full flex flex-col">
      <div className="p-4 border-b">
        <Link
          className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
          href={`/${lang}/app/templates`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("back")}
        </Link>
      </div>
      <div className="grow shrink-0 basis-auto flex">
        <Sidebar
          lang={lang}
          links={NAV_LINKS}
          dictionary="template"
          className="basis-64 shrink-0"
        />
        <div className="h-full basis-auto grow shrink-0">{children}</div>
      </div>
    </main>
  );
}
