interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  value: string;
}

export default async function TextCell({ value }: Props) {
  return (
    <div className="flex space-x-2">
      <span className="max-w-[500px] truncate font-medium">{value}</span>
    </div>
  );
}
