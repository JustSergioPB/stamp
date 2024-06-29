import CheckItem from "@components/stamp/check-item";
import ChipList from "@components/stamp/chip-list";
import Field from "@components/stamp/field";
import StatusBadge from "@components/stamp/status-badge";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { TemplateSummaryView } from "@features/template/models";
import { useTranslation } from "@i18n/server";
import {
  Calendar,
  CirclePlus,
  Database,
  Info,
  Languages,
  Loader,
  User,
} from "lucide-react";

type Props = {
  lang: string;
  summary: TemplateSummaryView;
};

export default async function Summary({ lang, summary }: Props) {
  const { t: tCredential } = await useTranslation(lang, "credential");
  const { t: tWord } = await useTranslation(lang, "words");
  const { t: tLang } = await useTranslation(lang, "langs");
  const { t } = await useTranslation(lang, "template");

  const {
    name,
    id,
    type,
    modifiedAt,
    createdAt,
    status,
    hasContent,
    hasCredentialId,
    hasSecurityAssertion,
    hasRevocation,
    lang: summaryLang,
    hasName,
    hasType,
  } = summary;

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="basis-1/3">
          <h1 className="text-xl font-semibold mb-2">{name ?? id}</h1>
          <ChipList items={type ?? []} />
        </div>
        <Button size="sm" disabled={status !== "ready"}>
          <CirclePlus className="h-4 w-4 mr-2" />
          {tCredential("actions.create")}
        </Button>
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
          <Field label={t("summary.createdAt.label")} Icon={Calendar}>
            <p className="text-sm">{createdAt}</p>
          </Field>
          <Field label={t("summary.modifiedAt.label")} Icon={Calendar}>
            <p className="text-sm">{modifiedAt}</p>
          </Field>
          <Field label={t("summary.status")} Icon={Loader}>
            <StatusBadge
              value={t(status === "ready" ? "status.ready" : "status.notReady")}
              variant={status === "ready" ? "success" : "base"}
            />
          </Field>
          <Field label={t("summary.createdBy")} Icon={User}>
            <p className="text-sm">John doe</p>
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
