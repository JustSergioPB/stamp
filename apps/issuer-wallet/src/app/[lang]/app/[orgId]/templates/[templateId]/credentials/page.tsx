import EmptyScreen from "@components/stamp/empty-screen";
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
import AddButton from "./_components/add-button";
import { CredentialMongoRepository } from "@features/credentials/credential/repositories";
import { ContentUtils } from "@features/credentials/template/utils/content.utils";
import { JsonSchema } from "@stamp/domain";

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
  const view = await TemplateMongoRepository.getById(templateId);
  const paginatedList = await CredentialMongoRepository.search(searchParams);
  let jsonSchema: JsonSchema | undefined;
  if (view.content?.credentialSubject) {
    jsonSchema = ContentUtils.removeIdFromSchema(
      view.content.credentialSubject
    );
  }

  return (
    <div className="h-full p-8 space-y-8 overflow-y-auto overflow-x-hidden bg-muted flex flex-col">
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
              {view.base?.name ?? templateId}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("title")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
        {jsonSchema && <AddButton lang={lang} jsonSchema={jsonSchema} />}
      </div>
      {paginatedList.items.length > 0 ? (
        <></>
      ) : (
        <EmptyScreen title={t("empty.title")} subtitle={t("empty.subtitle")}>
          {jsonSchema && <AddButton lang={lang} jsonSchema={jsonSchema} />}
        </EmptyScreen>
      )}
    </div>
  );
}

//TODO: Instead of empty screen if not content defined print alert
