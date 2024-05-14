import { Query } from "@stamp/database";
import { Schema } from "@stamp/domain";
import { Sidepanel } from "./sidepanel";
import Content from "./content";
import { Suspense } from "react";
import LoadingScreen from "@components/stamp/loading-screen";

type SchemasProps = {
  searchParams: {
    mode: string;
  } & Record<keyof Query<Schema>, string | undefined>;
};

export default async function Schemas({ searchParams }: SchemasProps) {
  const { mode, ...rest } = searchParams;
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schemas</h2>
          <p className=" text-neutral-500">
            Create, edit and manage your schemas here
          </p>
        </div>
        <Sidepanel isOpen={mode === "create"} />
      </div>
      <Suspense fallback={<LoadingScreen />}>
        <Content searchParams={rest} />
      </Suspense>
    </div>
  );
}
