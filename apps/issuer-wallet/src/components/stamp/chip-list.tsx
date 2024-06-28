import { Badge } from "@components/ui/badge";
import { cn } from "@lib/utils";
import React from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  items: string[];
  displayedItems?: number;
}

export default function ChipList({ items, className }: Props) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, index) => (
        <Badge key={index}>{item}</Badge>
      ))}
    </div>
  );
}
