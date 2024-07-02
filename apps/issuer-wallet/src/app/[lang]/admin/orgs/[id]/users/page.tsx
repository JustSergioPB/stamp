import AddUserButton from "@components/features/user-form";
import EmptyScreen from "@components/stamp/empty-screen";
import LinkCell from "@components/stamp/link-cell";
import StampTable, { Column } from "@components/stamp/table";
import TextCell from "@components/stamp/text-cell";
import { Badge } from "@components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { User } from "@features/auth/models";
import { OrgMongoRepository } from "@features/auth/repositories";
import { UserMongoRepository } from "@features/auth/repositories/user-mongo.repository";
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
  const query = QueryMapper.fromURL<User>({ ...searchParams, orgId: id });
  const paginatedList = await UserMongoRepository.search(query);
  const org = await OrgMongoRepository.getById(id);

  const columns: Column<User>[] = [
    {
      key: "id",
      name: t("props.id"),
      cell: (item) => (
        <LinkCell value={item.id} href={`orgs/${id}/users/${item.id}`} />
      ),
    },
    {
      key: "name",
      name: t("form.name.label"),
      cell: (item) => <TextCell value={`${item.name} ${item.lastName}`} />,
    },
    {
      key: "email",
      name: t("form.email.label"),
      cell: (item) => <TextCell value={item.email} />,
    },
    {
      key: "role",
      name: t("form.role.label"),
      cell: (item) => (
        <div className="flex space-x-2">
          <Badge variant="outline">{t(`roles.${item.role}`)}</Badge>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="flex items-center gap-1"
              href={`/${lang}/admin/orgs`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tOrgs("actions.backToOrgs")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${lang}/admin/orgs/${id}`}>
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
        <AddUserButton lang={lang} />
      </div>
      {paginatedList.items.length > 0 ? (
        <StampTable
          lang={lang}
          result={paginatedList}
          columns={columns}
          className="grow shrink-0 basis-auto"
        />
      ) : (
        <EmptyScreen title={t("empty.title")} subtitle={t("empty.subtitle")}>
          <AddUserButton lang={lang} />
        </EmptyScreen>
      )}
    </div>
  );
}
