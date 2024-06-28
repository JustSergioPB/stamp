import StatusBadge from "./status-badge";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  variant?: "success" | "error" | "base";
  value: string;
}

export default function StatusCell({ variant = "success", value }: Props) {
  return (
    <div className="flex space-x-2">
      <StatusBadge variant={variant} value={value} />
    </div>
  );
}
