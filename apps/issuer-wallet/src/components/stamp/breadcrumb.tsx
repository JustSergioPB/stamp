"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { useTranslation } from "@i18n/client";

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

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item) => (
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
