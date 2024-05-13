import { DataTable } from "@components/stamp/data-table";
import { Query, fromUrl, searchSchemas } from "@stamp/database";
import { Schema } from "@stamp/domain";
import { columns } from "./columns";
import { Sidepanel } from "./sidepanel";
import Empty from "./empty";
import { Paginator } from "@components/stamp/paginator";

type SchemasProps = {
  searchParams: {
    mode: string;
  } & Record<keyof Query<Schema>, string | undefined>;
};

export default async function Schemas({ searchParams }: SchemasProps) {
  const { mode, ...rest } = searchParams;
  const queryResult = await searchSchemas(fromUrl(rest));
  return (
    <>
      <div className="h-full flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Schemas</h2>
            <p className=" text-neutral-500">
              Create, edit and manage your schemas here
            </p>
          </div>
          <Sidepanel isOpen={mode === "create"}></Sidepanel>
        </div>
        {queryResult.items.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={queryResult.items.map((it) => it.toPrimitive())}
            />
            <Paginator
              currentPage={queryResult.currentPage}
              pageSize={queryResult.pageSize}
              totalPages={queryResult.totalPages}
            />
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}
