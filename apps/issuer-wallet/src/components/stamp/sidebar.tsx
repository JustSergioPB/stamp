"use client";

import { cn } from "@lib/utils";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { usePathname } from "next/navigation";
import { useTranslation } from "@i18n/client";
import { ReactNode } from "react";

export type NavLink = {
  title: string;
  label?: string;
  href: string;
  icon?: ReactNode;
};

interface Props extends React.HTMLAttributes<HTMLElement> {
  links: NavLink[];
  lang: string;
  header?: ReactNode;
  dictionary: string;
}

export default function Sidebar({
  links,
  className,
  lang,
  header,
  dictionary,
}: Props) {
  const pathname = usePathname();
  const { t } = useTranslation(lang, dictionary);

  return (
    <div className={cn("h-full border-r shadow-sm p-4", className)}>
      {header}
      <nav className="grid gap-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              pathname.includes(link.href)
                ? buttonVariants({ variant: "default", size: "sm" })
                : buttonVariants({ variant: "ghost", size: "sm" }),
              "justify-start"
            )}
          >
            {link.icon}
            {t(link.title)}
            {link.label && (
              <span
                className={cn(
                  "ml-auto",
                  pathname.includes(link.href) &&
                    "text-background dark:text-white"
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
