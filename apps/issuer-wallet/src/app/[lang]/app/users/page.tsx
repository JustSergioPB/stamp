import AddUserButton from "@components/features/user-form";
import EmptyScreen from "@components/stamp/empty-screen";
import LinkCell from "@components/stamp/link-cell";
import StampTable, { Column } from "@components/stamp/table";
import TextCell from "@components/stamp/text-cell";
import { Badge } from "@components/ui/badge";
import { User } from "@features/users/models";
import { OrgMongoRepository } from "@features/users/repositories";
import { UserMongoRepository } from "@features/users/repositories/user-mongo.repository";
import { Session } from "@features/users/utils/session";
import { useTranslation } from "@i18n/server";
import { QueryMapper, SearchParams } from "@lib/query";

type Props = {
  searchParams: SearchParams;
  params: { lang: string };
};

export default async function Page({ searchParams, params: { lang } }: Props) {
  const session = await Session.getCurrent();

  if (!session) {
    throw new Error("No session found");
  }

  const { t } = await useTranslation(lang, "users");
  const query = QueryMapper.fromURL<User>(searchParams);
  const paginatedList = await new UserMongoRepository().search(query);
  const org = await new OrgMongoRepository().getById(session.orgId);

  const columns: Column<User>[] = [
    {
      key: "id",
      name: t("props.id"),
      cell: (item) => (
        <LinkCell value={item.id} href={`orgs/${org.id}/users/${item.id}`} />
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
      <div className="flex items-center justify-end gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
        <AddUserButton lang={lang} orgId={org.id} />
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
          <AddUserButton lang={lang} orgId={org.id} />
        </EmptyScreen>
      )}
    </div>
  );
}
