type Props = {
  params: { lang: string; id: string };
};

export default async function Page({ params: { lang, id } }: Props) {
  return <section className="p-10">Overview</section>;
}
