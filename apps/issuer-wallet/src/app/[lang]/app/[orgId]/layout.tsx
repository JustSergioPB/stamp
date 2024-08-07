import Sidebar, { NavLink } from "@components/stamp/sidebar";
import { ReactNode } from "react";
import Banner from "@components/stamp/banner";
import { BookCopy, User } from "lucide-react";
import UserProfile from "@components/stamp/user-profile";
import { verifySession } from "@features/auth/server";
import { UserMongoRepository } from "@features/auth/repositories";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
  params: { lang: string; orgId: string };
};

export default async function Layout({
  children,
  params: { lang, orgId },
}: Props) {
  const session = await verifySession();

  if (!session || session.orgId !== orgId || session.role !== "superAdmin") {
    redirect(`/${lang}/auth`);
  }

  const user = await UserMongoRepository.getById(session.id);

  const navLinks: NavLink[] = [
    {
      title: "templates",
      icon: <BookCopy className="h-4 w-4" />,
      href: `/${lang}/app/${orgId}/templates`,
    },
    {
      title: "users",
      icon: <User className="h-4 w-4" />,
      href: `/${lang}/app/${orgId}/users`,
    },
  ];

  return (
    <main className="h-full overflow-hidden flex">
      <Sidebar
        lang={lang}
        links={navLinks}
        dictionary="sidebar"
        header={<Banner />}
        footer={<UserProfile user={user} lang={lang} />}
      />
      <div className="h-full basis-auto grow shrink-0">{children}</div>
    </main>
  );
}
