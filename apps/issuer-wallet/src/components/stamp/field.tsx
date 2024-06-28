import { LucideIcon } from "lucide-react";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  label: string;
  Icon: LucideIcon;
}

export default function Field({ label, Icon, children }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      {children}
    </div>
  );
}
