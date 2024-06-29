import { SearchParams } from "@lib/query";

type Props = {
  searchParams: SearchParams;
  params: { lang: string };
};

export default async function Page({ searchParams, params: { lang } }: Props) {
  return <></>;
}
