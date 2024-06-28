"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { useTranslation } from "@i18n/client";
import { usePathname } from "next/navigation";

export type BreadCrumbItem = {
  title: string;
  translate: boolean;
  href: string;
};
interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  items: BreadCrumbItem[];
  dictionary: string;
}

export default function BreadcrumbW({
  lang,
  className,
  items,
  dictionary,
}: Props) {
  const { t } = useTranslation(lang, dictionary);
  const pathname = usePathname();
  const last = pathname.split("/").pop();

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>
                {item.translate ? t(item.title) : item.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
