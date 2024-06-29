import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { buttonVariants } from "@components/ui/button";
import { OrgMongoRepository } from "@features/users/repositories";
import { useTranslation } from "@i18n/server";
import { cn } from "@lib/utils";
import { Separator } from "@components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  params: { lang: string; id: string };
  children?: ReactNode;
};

export default async function Page({ params: { lang, id } }: Props) {
  const { t } = await useTranslation(lang, "orgs");
  const repo = new OrgMongoRepository();
  const org = await repo.getById(id);

  return (
    <section className="h-full p-8 space-y-8 overflow-y-auto overflow-x-hidden">
      <Link
        className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
        href={`/${lang}/app/orgs`}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("actions.backToOrgs")}
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 basis-1/3">
          <Avatar className="h-24 w-24">
            <AvatarImage src={"org.logo"} alt={org.name} />
            <AvatarFallback>
              <span className="text-3xl">{org.name[0]}</span>
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold mb-2">{org.name}</h1>
            <Badge variant="outline">{t(`types.${org.type}`)}</Badge>
          </div>
        </div>
        <Link
          href={`/${lang}/app/orgs/${id}/users`}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          {t("actions.seeUsers")}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
      <Separator />
    </section>
  );
}
