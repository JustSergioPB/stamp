import Sidebar, { NavLink } from "@components/stamp/sidebar";
import { ReactNode } from "react";
import Banner from "@components/stamp/banner";
import { Building, Braces, User } from "lucide-react";
import ForbiddenScreen from "@components/stamp/forbidden-screen";
import UserProfile from "@components/stamp/user-profile";
import { CookieSession } from "@features/auth/utils";

type Props = {
  children: ReactNode;
  params: { lang: string };
};

export default async function Layout({ children, params: { lang } }: Props) {
  if (!process.env.JWT_SECRET) {
    throw new Error("No secret found");
  }

  const session = await CookieSession.getCurrent(process.env.JWT_SECRET);

  if (!session) {
    throw new Error("Forbidden");
  }

  const BASE_ROUTE = `/${lang}/app`;

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

  if (session.role === "superAdmin") {
    navLinks.push({
      title: "orgs",
      icon: <Building className="h-4 w-4 mr-2" />,
      href: `${BASE_ROUTE}/orgs`,
    });
  }

  return (
    <main className="h-full overflow-hidden flex">
      <Sidebar
        className="basis-64 shrink-0"
        lang={lang}
        links={navLinks}
        dictionary="sidebar"
        header={<Banner className="p-4" />}
        footer={<UserProfile className="p-4" user={session} lang={lang} />}
      />
      <div className="h-full basis-auto grow shrink-0">{children}</div>
    </main>
  );
}
