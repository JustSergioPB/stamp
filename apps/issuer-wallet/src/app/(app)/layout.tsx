import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function AppLayout({ children }: Props) {
  return <main className="h-screen overflow-hidden">{children}</main>;
}
