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
    <div
      className={cn(
        "h-full border-r-2 border-r-neutral-200 flex flex-col items-center",
        className
      )}
    >
      <PenTool className="h-7 w-7 text-blue-600 mt-8" />
      <nav className="grid gap-2 mt-10">
        <TooltipProvider delayDuration={0}>
          {links.map((link, index) => (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </div>
  );
}
