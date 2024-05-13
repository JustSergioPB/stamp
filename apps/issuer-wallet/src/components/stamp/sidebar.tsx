"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@components/ui/tooltip";
import { LucideIcon, PenTool } from "lucide-react";
import { cn } from "@lib/utils";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { usePathname } from "next/navigation";

export type NavLink = {
  title: string;
  label?: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};

export type SidebarProps = {
  links: NavLink[];
  className?: string;
};

export function Sidebar({ links, className }: SidebarProps) {
  const pathName = usePathname();
  links.forEach((link) => {
    if (link.href === pathName) {
      link.variant = "default";
    }
  });
  return (
    <div className={cn("h-full border-r shadow-sm p-4", className)}>
      <div className="flex items-center gap-2 mt-4">
        <PenTool className="h-7 w-7" />
        <h1 className="text-xl font-semibold leading-tight">IssuerWallet</h1>
      </div>
      <nav className="grid gap-2 mt-10">
        <TooltipProvider delayDuration={0}>
          {links.map((link, index) => (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </TooltipProvider>
      </nav>
    </div>
  );
}