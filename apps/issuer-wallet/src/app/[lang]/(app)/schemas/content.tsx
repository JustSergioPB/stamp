import { Paginator } from "@components/stamp/paginator";
import { columns } from "./columns";
import { DataTable } from "@components/stamp/data-table";
import { Query, fromUrl, searchSchemas } from "@stamp/database";
import { Schema } from "@stamp/domain";
import ErrorScreen from "@components/stamp/error-screen";
import EmptyScreen from "@components/stamp/empty-screen";
import { Translatable } from "@i18n/types/translatable";

type Props = {
  searchParams: Record<keyof Query<Schema>, string | undefined>;
} & Translatable;

export default async function Content({ searchParams, lang }: Props) {
  try {
    const queryResult = await searchSchemas(fromUrl(searchParams));
    return queryResult.items.length > 0 ? (
      <>
        <DataTable
          columns={columns}
          data={queryResult.items.map((it) => it.toPrimitive())}
        />
        <Paginator
          currentPage={queryResult.currentPage}
          pageSize={queryResult.pageSize}
          totalPages={queryResult.totalPages}
          lang={lang}
        />
      </>
    ) : (
      <EmptyScreen />
    );
  } catch (error) {
    return <ErrorScreen lang={lang} />;
  }
}
