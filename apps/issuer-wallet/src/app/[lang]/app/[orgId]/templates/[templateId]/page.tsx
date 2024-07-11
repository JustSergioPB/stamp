import { useTranslation } from "@i18n/server";
import { TemplateMongoRepository } from "@features/credentials/template/repositories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import BaseCard from "./_components/base/base-card";
import ValidityCard from "./_components/validity/validity-card";
import SecurityCard from "./_components/security/security-card";
import StatusCard from "./_components/status/status-card";
import ContentCard from "./_components/content/content-card";

type Props = {
  params: { lang: string; templateId: string; orgId: string };
};

export default async function Page({
  params: { lang, templateId, orgId },
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const view = await TemplateMongoRepository.getById(templateId);

  return (
    <div className="h-full p-8 space-y-8 overflow-y-auto overflow-x-hidden bg-muted">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${lang}/app/${orgId}/templates`}>
              {t("title")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{view.base?.name ?? view.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-8">
        <div className="basis-3/5 grow shrink-0 space-y-8">
          <BaseCard lang={lang} template={view} />
          <ValidityCard lang={lang} template={view} />
          <div className="flex gap-8">
            <SecurityCard className="basis-1/2" template={view} lang={lang} />
            <StatusCard className="basis-1/2" template={view} lang={lang} />
          </div>
        </div>
        <ContentCard
          className="basis-2/5 min-w-0"
          template={view}
          lang={lang}
        />
      </div>
    </div>
  );
}
