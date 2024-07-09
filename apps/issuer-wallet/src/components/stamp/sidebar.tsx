"use client";

import { cn } from "@lib/utils";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { usePathname } from "next/navigation";
import { useTranslation } from "@i18n/client";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

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
  footer?: ReactNode;
  dictionary: string;
  size?: "compact" | "extended";
  exact?: boolean;
}

export default function Sidebar({
  links,
  className,
  lang,
  header,
  footer,
  dictionary,
  size = "compact",
  exact = false,
}: Props) {
  const pathname = usePathname();
  const { t } = useTranslation(lang, dictionary);

  function isSelected(href: string) {
    return exact ? pathname === href : pathname.includes(href);
  }

  return (
    <div
      className={cn(
        "h-full border-r shadow-sm space-y-4 flex flex-col p-4",
        size === "compact" ? "basis-16 items-center" : "basis-64"
      )}
    >
      {header}
      <nav className="grid content-start gap-2 grow shrink-0 basis-auto py-8">
        {links.map((link, index) =>
          size === "compact" ? (
            <TooltipProvider delayDuration={0} key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={link.href}
                    className={cn(
                      isSelected(link.href)
                        ? buttonVariants({ variant: "default", size: "icon" })
                        : buttonVariants({ variant: "ghost", size: "icon" })
                    )}
                  >
                    {link.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{t(link.title)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                isSelected(link.href)
                  ? buttonVariants({ variant: "default", size: "sm" })
                  : buttonVariants({ variant: "ghost", size: "sm" }),
                "justify-start gap-2"
              )}
            >
              {link.icon}
              {t(link.title)}
            </Link>
          )
        )}
      </nav>
      {footer}
    </div>
  );
}
