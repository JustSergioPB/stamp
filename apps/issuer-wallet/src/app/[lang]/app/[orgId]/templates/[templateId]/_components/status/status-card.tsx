import ChipList from "@components/stamp/chip-list";
import Field from "@components/stamp/field";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Template } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";
import { BadgeX, OctagonPause, Waypoints } from "lucide-react";
import StatusForm from "./status-form";
import { TemplateUtils } from "@features/credentials/template/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  template: Template;
}

export default async function StatusCard({ lang, template, className }: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tWord } = await useTranslation(lang, "words");
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.status.title")}</CardTitle>
          <StatusForm
            lang={lang}
            templateId={template.id}
            formValue={template.status}
            disabled={!TemplateUtils.canEdit(template)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label={t("form.status.revocable.label")} Icon={BadgeX}>
          <p className="text-sm">
            {template.status?.revocable ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.status.suspendable.label")} Icon={OctagonPause}>
          <p className="text-sm">
            {template.status?.suspendable ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.status.default.label")} Icon={Waypoints}>
          <p>{template.status?.defaultState ?? tWord("active")}</p>
        </Field>
        <Field
          label={t("form.status.states.label")}
          Icon={Waypoints}
          type="vertical"
        >
          <ChipList items={template.status?.states ?? []} />
        </Field>
      </CardContent>
    </Card>
  );
}
