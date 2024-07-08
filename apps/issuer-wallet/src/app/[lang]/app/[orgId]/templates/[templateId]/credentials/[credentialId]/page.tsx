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
import { t } from "i18next";

type Props = {
  params: {
    lang: string;
    templateId: string;
    orgId: string;
    credentialId: string;
  };
};

export default async function Page({
  params: { templateId, orgId, lang, credentialId },
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
            <BreadcrumbLink
              href={`/${lang}/app/${orgId}/templates/${templateId}/credentials`}
            >
              {t("title")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{credentialId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
