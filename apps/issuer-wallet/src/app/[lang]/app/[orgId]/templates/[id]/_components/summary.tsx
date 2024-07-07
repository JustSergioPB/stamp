import CheckItem from "@components/stamp/check-item";
import ChipList from "@components/stamp/chip-list";
import Field from "@components/stamp/field";
import StatusBadge from "@components/stamp/status-badge";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Separator } from "@components/ui/separator";
import { TemplateDetailedView } from "@features/credentials/template/models";
import { SummaryMapper } from "@features/credentials/template/utils";
import { useTranslation } from "@i18n/server";
import { Database, Info, Languages, Loader } from "lucide-react";
import AddButton from "./add-button";

type Props = {
  lang: string;
  view: TemplateDetailedView;
};

export default async function Summary({ lang, view }: Props) {
  const { t: tWord } = await useTranslation(lang, "words");
  const { t: tLang } = await useTranslation(lang, "langs");
  const { t } = await useTranslation(lang, "template");
  const {
    id,
    name,
    status,
    type,
    lang: summaryLang,
    hasContent,
    hasCredentialId,
    hasSecurityAssertion,
    hasRevocation,
    hasName,
    hasType,
  } = SummaryMapper.fromDetailedView(view);

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="basis-1/3">
          <h1 className="text-xl font-semibold mb-2">{name ?? id}</h1>
          <ChipList items={type ?? []} />
        </div>
        <AddButton lang={lang} disabled={status !== "ready"} template={view} />
      </section>
      <Separator />
      {status === "not-ready" && (
        <Alert>
          <Info className="h-5 w-5" />
          <AlertTitle>{t("summary.alert.title")}</AlertTitle>
          <AlertDescription>{t("summary.alert.description")}</AlertDescription>
        </Alert>
      )}
      <section className="flex gap-32">
        <div className="space-y-4 basis-1/4">
          <Field label={t("summary.id")} Icon={Database}>
            <p className="text-sm">{id}</p>
          </Field>
          <Field label={t("summary.status")} Icon={Loader}>
            <StatusBadge
              value={t(status === "ready" ? "status.ready" : "status.notReady")}
              variant={status === "ready" ? "success" : "base"}
            />
          </Field>
          <Field label={t("summary.lang")} Icon={Languages}>
            <p className="text-sm">{summaryLang ? tLang(summaryLang) : ""}</p>
          </Field>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">{tWord("compulsory")}</h4>
            <CheckItem
              label={`${t("form.content.title")} - ${t("summary.hasContent")}`}
              checked={hasContent}
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">{tWord("recommended")}</h4>
            <CheckItem
              label={`${t("form.base.title")} - ${t("summary.hasName")}`}
              checked={hasName}
            />
            <CheckItem
              label={`${t("form.base.title")} - ${t("summary.hasType")}`}
              checked={hasType}
            />
            <CheckItem
              label={`${t("form.base.title")} - ${t("summary.hasCredentialId")}`}
              checked={hasCredentialId}
            />
            <CheckItem
              label={`${t("form.security.title")} - ${t("summary.hasSecurityAssertion")}`}
              checked={hasSecurityAssertion}
            />
            <CheckItem
              label={`${t("form.status.title")} - ${t("summary.hasRevocation")}`}
              checked={hasRevocation}
            />
          </div>
        </div>
      </section>
      <Separator />
    </>
  );
}
