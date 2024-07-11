"use client";

import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { logoutAction } from "@features/auth/actions";
import { User } from "@features/auth/models";
import { useTranslation } from "@i18n/client";
import { LogOut, PenTool, ShieldCheck, ShieldHalf } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  user: User;
  lang: string;
}

export default function UserProfile({ user, lang }: Props) {
  const router = useRouter();
  const { t } = useTranslation(lang, "words");

  function getAvatarFallbackBg() {
    if (user.role === "superAdmin") return "bg-orange-100 text-orange-500";
    if (user.role === "orgAdmin") return "bg-purple-100 text-purple-500";
    if (user.role === "issuer") return "bg-blue-100 text-blue-500";
  }

  function getAvatarFallbackIcon() {
    if (user.role === "superAdmin") return <ShieldHalf className="h-5 w-5" />;
    if (user.role === "orgAdmin") return <ShieldCheck className="h-5 w-5" />;
    if (user.role === "issuer") return <PenTool className="h-5 w-5" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className={getAvatarFallbackBg()}>
            {`${user.name[0]?.toUpperCase()}${user.lastName[0]?.toUpperCase()}`}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 translate-x-4 -translate-y-2"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex gap-1 items-center">
            <Avatar>
              <AvatarFallback className={getAvatarFallbackBg()}>
                {getAvatarFallbackIcon()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{`${user.name} ${user.lastName}`}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => {
            logoutAction();
            router.push(`/${lang}/auth`);
          }}
        >
          {t("logout")}
          <LogOut className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
