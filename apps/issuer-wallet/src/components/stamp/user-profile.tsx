"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { logoutAction } from "@features/auth/actions";
import { User } from "@features/auth/models";
import { cn } from "@lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  user: User;
  lang: string;
}

export default function UserProfile({ user, className, lang }: Props) {
  const router = useRouter();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar>
        <AvatarImage src={user.profilePic} alt={user.name} />
        <AvatarFallback>
          {`${user.name[0]}${user.lastName[0]}`.toUpperCase()}
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
