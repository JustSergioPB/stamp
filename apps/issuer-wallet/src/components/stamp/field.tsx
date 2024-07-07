import { cn } from "@lib/utils";
import { LucideIcon } from "lucide-react";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  label: string;
  Icon: LucideIcon;
  type?: "vertical" | "horizontal";
}

export default function Field({ label, Icon, children, type }: Props) {
  return (
    <div
      className={cn(
        type === "vertical" ? "space-y-2" : "flex items-center justify-between"
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      {children}
    </div>
  );
}
