import Sidebar, { NavLink } from "@components/stamp/sidebar";
import { TemplateMongoRepository } from "@features/credentials/template/repositories";
import { Book, FileStack } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { lang: string; orgId: string; templateId: string };
};

export default async function Layout({
  children,
  params: { lang, orgId, templateId },
}: Props) {
  const navLinks: NavLink[] = [
    {
      title: "overview",
      icon: <Book className="h-4 w-4" />,
      href: `/${lang}/app/${orgId}/templates/${templateId}`,
    },
    {
      title: "credentials",
      icon: <FileStack className="h-4 w-4" />,
      href: `/${lang}/app/${orgId}/templates/${templateId}/credentials`,
    },
  ];

  const view = await TemplateMongoRepository.getById(templateId);

  return (
    <div className="h-full overflow-hidden flex">
      <Sidebar
        header={
          <h1 className="text-lg font-bold">{view.base?.name ?? view.id}</h1>
        }
        lang={lang}
        links={navLinks}
        dictionary="template"
        size="extended"
        exact
      />
      <div className="h-full basis-auto grow shrink-0">{children}</div>
    </div>
  );
}
