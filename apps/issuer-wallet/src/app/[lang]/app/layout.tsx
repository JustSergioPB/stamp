import Sidebar, { NavLink } from "@components/stamp/sidebar";
import { ReactNode } from "react";
import Banner from "@components/stamp/banner";
import { Building, Braces, User } from "lucide-react";
import { Session } from "@features/users/utils/session";
import ForbiddenScreen from "@components/stamp/forbidden-screen";

type Props = {
  children: ReactNode;
  params: { lang: string };
};

export default async function Layout({ children, params: { lang } }: Props) {
  const currentSession = await Session.getCurrent();

  if (!currentSession) {
    return <ForbiddenScreen lang={lang} />;
  }

  const BASE_ROUTE = `/${lang}/app`;

  const NAV_LINKS: NavLink[] = [
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
    {
      title: "orgs",
      icon: <Building className="h-4 w-4 mr-2" />,
      href: `${BASE_ROUTE}/orgs`,
    },
  ];

  return (
    <main className="h-full overflow-hidden flex">
      <Sidebar
        className="basis-64 shrink-0"
        lang={lang}
        links={NAV_LINKS}
        dictionary="sidebar"
        header={<Banner className="mt-4 mb-10" />}
      />
      <div className="h-full basis-auto grow shrink-0">{children}</div>
    </main>
  );
}
