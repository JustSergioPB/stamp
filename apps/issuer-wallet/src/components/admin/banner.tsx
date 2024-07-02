import { cn } from "@lib/utils";
import { ShieldHalf } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function Banner({ className }: Props) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <ShieldHalf className="h-6 w-6" />
      <h1 className="text-2xl font-semibold leading-tight">Admin</h1>
    </div>
  );
}
