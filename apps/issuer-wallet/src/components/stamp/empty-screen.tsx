"use client";

import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  subtitle: string;
  action: string;
};

export default function EmptyScreen({ title, subtitle, action }: Props) {
  const router = useRouter();

  function onOpenClick() {
    router.push("?mode=create");
  }

  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <Button className="mt-4" size="sm" onClick={onOpenClick}>
          <CirclePlus className="h-4 w-4 mr-2" />
          {action}
        </Button>
      </div>
    </div>
  );
}
