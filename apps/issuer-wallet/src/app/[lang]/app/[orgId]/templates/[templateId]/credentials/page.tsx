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
import { TemplateUtils } from "@features/credentials/template/utils";
import { JsonSchemaMongoRepository } from "@features/credentials/json-schema/repositories";

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
  const jsonSchema = view.jsonSchemaId
    ? await JsonSchemaMongoRepository.getById(view.jsonSchemaId)
    : undefined;
  const paginatedList = await CredentialMongoRepository.search(searchParams);
  const canEmit = TemplateUtils.canEmit(view);

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
        {jsonSchema && (
          <AddButton lang={lang} jsonSchema={jsonSchema} disabled={!canEmit} />
        )}
      </div>
      {paginatedList.items.length > 0 ? (
        <></>
      ) : (
        <EmptyScreen
          title={canEmit ? t("empty.title") : tTemplate("emit.cant.title")}
          subtitle={
            canEmit ? t("empty.subtitle") : tTemplate("emit.cant.subtitle")
          }
        >
          {jsonSchema && (
            <AddButton
              lang={lang}
              jsonSchema={jsonSchema}
              disabled={!canEmit}
            />
          )}
        </EmptyScreen>
      )}
    </div>
  );
}
