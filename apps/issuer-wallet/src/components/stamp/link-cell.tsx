import Link from "next/link";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  value: string;
  href: string;
}

export default async function LinkCell({ value, href }: Props) {
  return (
    <div className="flex space-x-2">
      <Link
        className="max-w-[500px] truncate font-medium hover:text-primary hover:underline"
        href={href}
      >
        {value}
      </Link>
    </div>
  );
}
