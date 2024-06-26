import { buttonVariants } from "@components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { useTranslation } from "@i18n/server";
import { cn } from "@lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Summary from "./_components/summary";
import BaseForm from "./_components/base-form";
import ContentForm from "./_components/content-form";
import SecurityForm from "./_components/security-form";
import StatusForm from "./_components/status-form";
import ValdityForm from "./_components/validity-form";
import { TemplateMongoRepository } from "@features/template/repositories";
import { SummaryMapper } from "@features/template/utils";

type Props = {
  params: { lang: string; id: string };
};

export default async function Page({ params: { lang, id } }: Props) {
  const { t } = await useTranslation(lang, "template");
  const detailedView = await new TemplateMongoRepository().getById(id);
  const summary = SummaryMapper.fromDetailedView(detailedView);

  return (
    <main className="h-full p-8 space-y-8 overflow-y-auto overflow-x-hidden">
      <Link
        className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
        href={`/${lang}/app/templates`}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("actions.backToTemplates")}
      </Link>
      <Summary lang={lang} summary={summary} />
      <Tabs defaultValue="base">
        <TabsList>
          <TabsTrigger value="base">{t("form.base.title")}</TabsTrigger>
          <TabsTrigger value="content">{t("form.content.title")}</TabsTrigger>
          <TabsTrigger value="security">{t("form.security.title")}</TabsTrigger>
          <TabsTrigger value="status">{t("form.status.title")}</TabsTrigger>
          <TabsTrigger value="validity">{t("form.validity.title")}</TabsTrigger>
        </TabsList>
        <TabsContent value="base" className="mt-8 w-2/3">
          <h2 className="text-lg font-semibold mb-2">{t("form.base.title")}</h2>
          <h3 className="text-sm text-muted-foreground mb-8">
            {t("form.base.subtitle")}
          </h3>
          <BaseForm lang={lang} templateId={id} formValue={detailedView.base} />
        </TabsContent>
        <TabsContent value="content" className="mt-8 w-2/3">
          <h2 className="text-lg font-semibold mb-2">
            {t("form.content.title")}
          </h2>
          <h3 className="text-sm text-muted-foreground mb-8">
            {t("form.content.subtitle")}
          </h3>
          <ContentForm
            lang={lang}
            templateId={id}
            formValue={detailedView.content}
          />
        </TabsContent>
        <TabsContent value="security" className="mt-8 w-2/3">
          <h2 className="text-lg font-semibold mb-2">
            {t("form.security.title")}
          </h2>
          <h3 className="text-sm text-muted-foreground mb-8">
            {t("form.security.subtitle")}
          </h3>
          <SecurityForm
            lang={lang}
            templateId={id}
            formValue={detailedView.security}
          />
        </TabsContent>
        <TabsContent value="status" className="mt-8 w-2/3">
          <h2 className="text-lg font-semibold mb-2">
            {t("form.status.title")}
          </h2>
          <h3 className="text-sm text-muted-foreground mb-8">
            {t("form.status.subtitle")}
          </h3>
          <StatusForm
            lang={lang}
            templateId={id}
            formValue={detailedView.status}
          />
        </TabsContent>
        <TabsContent value="validity" className="mt-8 w-2/3">
          <h2 className="text-lg font-semibold mb-2">
            {t("form.validity.title")}
          </h2>
          <h3 className="text-sm text-muted-foreground mb-8">
            {t("form.validity.subtitle")}
          </h3>
          <ValdityForm
            lang={lang}
            templateId={id}
            formValue={detailedView.validity}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
