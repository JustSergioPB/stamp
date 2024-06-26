import { cn } from "@lib/utils";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  variant?: "success" | "error" | "base";
  value: string;
}

export default function StatusBadge({ variant = "success", value }: Props) {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-sm",
        {
          "bg-green-100 text-green-500": variant === "success",
          "bg-red-100 text-red-500": variant === "error",
          "bg-gray-100 text-gray-500": variant === "base",
        },
        "flex items-center"
      )}
    >
      <div
        className={cn("w-2 h-2 rounded-full mr-2", {
          "bg-green-500": variant === "success",
          "bg-red-500": variant === "error",
          "bg-gray-500": variant === "base",
        })}
      ></div>
      {value}
    </span>
  );
}
