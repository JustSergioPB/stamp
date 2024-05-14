import { Query } from "@stamp/database";
import { Schema } from "@stamp/domain";
import { Sidepanel } from "./sidepanel";
import Content from "./content";
import { Suspense } from "react";
import LoadingScreen from "@components/stamp/loading-screen";
import { DICTIONARIES } from "@i18n/constants/dictionaries.const";

type SchemasProps = {
  searchParams: {
    mode: string;
  } & Record<keyof Query<Schema>, string | undefined>;
  params: { lang: string };
};

export default async function Schemas({
  searchParams,
  params: { lang },
}: SchemasProps) {
  const { mode, ...rest } = searchParams;
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {DICTIONARIES[lang]?.schemas}
          </h2>
          <p className=" text-neutral-500">{DICTIONARIES[lang]?.schemasCTA}</p>
        </div>
        <Sidepanel lang={lang} isOpen={mode === "create"} />
      </div>
      <Suspense fallback={<LoadingScreen />}>
        <Content lang={lang} searchParams={rest} />
      </Suspense>
    </div>
  );
}
