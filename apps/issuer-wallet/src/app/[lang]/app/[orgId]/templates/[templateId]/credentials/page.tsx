import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@components/ui/breadcrumb";
import { TemplateMongoRepository } from "@features/credentials/template/repositories";
import { useTranslation } from "@i18n/server";
import { SearchParams } from "@lib/query";
import { t } from "i18next";

type Props = {
  searchParams: SearchParams;
  params: { lang: string; templateId: string; orgId: string };
};

export default async function Page({
  searchParams,
  params: { lang, templateId, orgId },
}: Props) {
  const { t } = await useTranslation(lang, "credential");
  const { t: tTemplate } = await useTranslation(lang, "template");
  const name = await TemplateMongoRepository.getName(templateId);

  return (
    <div className="h-full p-8 space-y-8 overflow-y-auto overflow-x-hidden bg-muted">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${lang}/app/${orgId}/templates`}>
              {tTemplate("title")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${lang}/app/${orgId}/templates/${templateId}`}
            >
              {name ?? templateId}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("title")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
