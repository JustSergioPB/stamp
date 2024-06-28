import { cn } from "@lib/utils";
import { Check } from "lucide-react";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  label: string;
  checked: boolean;
}

export default function CheckItem({ label, checked }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "rounded-full h-6 w-6 flex items-center justify-center",
          checked ? "bg-emerald-100" : "border border-dotted border-muted-foreground"
        )}
      >
        {checked && <Check className="h-4 w-4 text-emerald-500" />}
      </div>
      <p className={cn("text-sm", checked ? "text-emerald-500" : "text-muted-foreground")}>
        {label}
      </p>
    </div>
  );
}
