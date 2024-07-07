import AddUserButton from "@components/features/user-form";
import EmptyScreen from "@components/stamp/empty-screen";
import LinkCell from "@components/stamp/link-cell";
import StampTable, { Column } from "@components/stamp/table";
import TextCell from "@components/stamp/text-cell";
import { Badge } from "@components/ui/badge";
import { User } from "@features/auth/models";
import { UserMongoRepository } from "@features/auth/repositories/user-mongo.repository";
import { useTranslation } from "@i18n/server";
import { SearchParams } from "@lib/query";

type Props = {
  searchParams: SearchParams;
  params: { lang: string; orgId: string };
};

export default async function Page({
  searchParams,
  params: { lang, orgId },
}: Props) {
  const { t } = await useTranslation(lang, "users");
  const paginatedList = await UserMongoRepository.search(searchParams);

  const columns: Column<User>[] = [
    {
      key: "id",
      name: t("props.id"),
      cell: (item) => (
        <LinkCell value={item.id} href={`orgs/${orgId}/users/${item.id}`} />
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
    <div className="h-full flex flex-col gap-8 p-8 bg-muted">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
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
