import AddUserButton from "@components/features/user-form";
import UserTable from "@components/features/user-table";
import EmptyScreen from "@components/stamp/empty-screen";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { User } from "@features/users/models";
import { OrgMongoRepository } from "@features/users/repositories";
import { UserMongoRepository } from "@features/users/repositories/user-mongo.repository";
import { useTranslation } from "@i18n/server";
import { QueryMapper, SearchParams } from "@lib/query";
import { ArrowLeft } from "lucide-react";

type Props = {
  searchParams: SearchParams;
  params: { lang: string; id: string };
};

export default async function Page({
  searchParams,
  params: { lang, id },
}: Props) {
  const { t } = await useTranslation(lang, "users");
  const { t: tOrgs } = await useTranslation(lang, "orgs");
  const query = QueryMapper.fromURL<User>(searchParams);
  const paginatedList = await new UserMongoRepository().search(query);
  const org = await new OrgMongoRepository().getById(id);

  return (
    <div className="h-full flex flex-col gap-4 p-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="flex items-center gap-1"
              href={`/${lang}/app/orgs`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tOrgs("actions.backToOrgs")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${lang}/app/orgs/${id}`}>
              {org.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("title")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-end gap-2">
        <AddUserButton lang={lang} orgId={id} />
      </div>
      {paginatedList.items.length > 0 ? (
        <UserTable lang={lang} result={paginatedList} />
      ) : (
        <EmptyScreen title={t("empty.title")} subtitle={t("empty.subtitle")}>
          <AddUserButton lang={lang} orgId={id} />
        </EmptyScreen>
      )}
    </div>
  );
}
