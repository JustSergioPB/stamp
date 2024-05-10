type Props = {
  children?: React.ReactNode;
};

export default function TreeLine({ children }: Props) {
  return (
    <div className="flex items-center h-full">
      <span className="border-l-2 border-l-neutral-300 h-full inline-block ml-2"></span>
      {children}
    </div>
  );
}
