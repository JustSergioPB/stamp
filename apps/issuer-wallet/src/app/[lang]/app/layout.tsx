import Sidebar, { NavLink } from "@components/stamp/sidebar";
import { ReactNode } from "react";
import Banner from "@components/stamp/banner";
import { Building, Braces, User } from "lucide-react";
import UserProfile from "@components/stamp/user-profile";
import { verifySession } from "@features/auth/server";
import { UserMongoRepository } from "@features/auth/repositories";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
  params: { lang: string };
};

export default async function Layout({ children, params: { lang } }: Props) {
  const session = await verifySession();

  if (!session) {
    redirect(`${lang}/auth`);
  }

  const user = await UserMongoRepository.getById(session.id);

  const BASE_ROUTE = `/${lang}/admin`;

  const navLinks: NavLink[] = [
    {
      title: "templates",
      icon: <Braces className="h-4 w-4 mr-2" />,
      href: `${BASE_ROUTE}/templates`,
    },
    {
      title: "users",
      icon: <User className="h-4 w-4 mr-2" />,
      href: `${BASE_ROUTE}/users`,
    },
  ];

  return (
    <main className="h-full overflow-hidden flex">
      <Sidebar
        className="basis-64 shrink-0"
        lang={lang}
        links={navLinks}
        dictionary="sidebar"
        header={<Banner className="p-4" />}
        footer={<UserProfile className="p-4" user={user} lang={lang} />}
      />
      <div className="h-full basis-auto grow shrink-0">{children}</div>
    </main>
  );
}
