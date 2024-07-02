"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { logoutAction } from "@features/auth/actions";
import { User } from "@features/auth/models";
import { cn } from "@lib/utils";
import { LogOut, PenTool, Shield, ShieldCheck, ShieldHalf } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  user: User;
  lang: string;
}

export default function UserProfile({ user, className, lang }: Props) {
  const router = useRouter();

  function getAvatarFallbackBg() {
    if (user.role === "superAdmin") return "bg-purple-100";
    if (user.role === "orgAdmin") return "bg-rose-100";
    if (user.role === "issuer") return "bg-orange-100";
  }

  function getAvatarFallbackIcon() {
    if (user.role === "superAdmin")
      return <ShieldHalf className="h-5 w-5 text-purple-500" />;
    if (user.role === "orgAdmin")
      return <ShieldCheck className="h-5 w-5 text-rose-500" />;
    if (user.role === "issuer")
      return <PenTool className="h-5 w-5 text-orange-500" />;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar>
        <AvatarFallback className={getAvatarFallbackBg()}>
          {getAvatarFallbackIcon()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold text-sm">{`${user.name} ${user.lastName}`}</span>
        <span className="text-muted-foreground text-xs">{user.email}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          logoutAction();
          router.push(`/${lang}/auth`);
        }}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
