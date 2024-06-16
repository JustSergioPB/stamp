import ErrorScreen from "@components/stamp/error-screen";
import EmptyScreen from "@components/stamp/empty-screen";
import { Translatable } from "@i18n/types/translatable";
import { TemplateSchema } from "@schemas/template/template.schema";
import { Query } from "@models/query";
import { searchTemplate } from "@db/repositories";
import { DataTable } from "@components/stamp/data-table";
import { Paginator } from "@components/stamp/paginator";
import { COLUMNS } from "./columns";
import { fromUrl } from "@utils/query.utils";

type Props = {
  searchParams: Record<keyof Query<TemplateSchema>, string | undefined>;
} & Translatable;

export default async function Content({ searchParams, lang }: Props) {
  try {
    const queryResult = await searchTemplate(fromUrl(searchParams));
    return queryResult.items.length > 0 ? (
      <>
        <DataTable lang={lang} columns={COLUMNS} data={queryResult.items} />
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
