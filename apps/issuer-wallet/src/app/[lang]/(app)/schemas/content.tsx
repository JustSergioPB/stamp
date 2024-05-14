import { Query, fromUrl, searchSchemas } from "@stamp/database";
import { Schema } from "@stamp/domain";
import ErrorScreen from "@components/stamp/error-screen";
import EmptyScreen from "@components/stamp/empty-screen";
import { Translatable } from "@i18n/types/translatable";
import Table from "./table";

type Props = {
  searchParams: Record<keyof Query<Schema>, string | undefined>;
} & Translatable;

export default async function Content({ searchParams, lang }: Props) {
  try {
    const queryResult = await searchSchemas(fromUrl(searchParams));
    const { items, ...rest } = queryResult;
    return queryResult.items.length > 0 ? (
      <Table
        lang={lang}
        queryResult={{
          items: items.map((it) => it.toPrimitive()),
          ...rest,
        }}
      />
    ) : (
      <EmptyScreen />
    );
  } catch (error) {
    return <ErrorScreen lang={lang} />;
  }
}
