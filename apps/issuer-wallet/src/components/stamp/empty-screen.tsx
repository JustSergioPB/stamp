import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export default function EmptyScreen({ title, subtitle, children }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm bg-white">
      <div className="flex flex-col items-center gap-1 text-center w-full">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground w-2/3 mb-4">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
