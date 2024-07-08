import { cn } from "@lib/utils";
import { PenTool } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  size?: "compact" | "extended";
}

export default function Banner({ className, size = "compact" }: Props) {
  return (
    <div
      className={cn(
        "flex items-center",
        size === "extended" && "gap-1",
        size === "extended" && className
      )}
    >
      <PenTool className="h-6 w-6" />
      {size === "extended" && (
        <span className="font-semibold">Issuer Wallet</span>
      )}
    </div>
  );
}
