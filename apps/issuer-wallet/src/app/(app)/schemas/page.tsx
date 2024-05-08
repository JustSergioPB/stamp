import { Query, fromUrl, searchSchemas } from "@stamp/database";
import { Schema } from "@stamp/domain";

type SchemasProps = {
  searchParams: Record<keyof Query<Schema>, string | undefined>;
};

export default async function Schemas({ searchParams }: SchemasProps) {
  const queryResult = await searchSchemas(fromUrl(searchParams));
  return <></>;
}
