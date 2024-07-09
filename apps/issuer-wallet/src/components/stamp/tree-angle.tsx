import { cn } from "@lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function TreeAngle({ children, className }: Props) {
  return (
    <div className={cn("flex items-center", className)}>
      <span className="border-l-2 border-l-neutral-300 border-b-2 border-b-neutral-300 h-[1.4rem] w-4 inline-block mb-[1.2rem]"></span>
      {children}
    </div>
  );
}
