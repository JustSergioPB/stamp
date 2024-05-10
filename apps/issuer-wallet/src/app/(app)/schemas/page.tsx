import SchemaForm from "@components/schemas/schema-form";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Query, fromUrl, searchSchemas } from "@stamp/database";
import { Schema } from "@stamp/domain";

type SchemasProps = {
  searchParams: Record<keyof Query<Schema>, string | undefined>;
};

export default async function Schemas({ searchParams }: SchemasProps) {
  const queryResult = await searchSchemas(fromUrl(searchParams));
  return (
    <div className="h-full flex gap-4">
      <div className="basis-1/2"></div>
      <Card className="h-full basis-1/2 flex flex-col">
        <CardHeader>
          <CardTitle>Create a new schema</CardTitle>
        </CardHeader>
        <CardContent className="grow shrink-0 basis-auto">
          <SchemaForm></SchemaForm>
        </CardContent>
      </Card>
    </div>
  );
}
