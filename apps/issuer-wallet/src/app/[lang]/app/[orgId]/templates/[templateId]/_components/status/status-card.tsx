import ChipList from "@components/stamp/chip-list";
import Field from "@components/stamp/field";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { StatusZod } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";
import { Pencil, BadgeX, OctagonPause, Waypoints } from "lucide-react";
import StatusForm from "./status-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  value: StatusZod | undefined;
  id: string;
}

export default async function StatusCard({
  lang,
  value,
  id,
  className,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tWord } = await useTranslation(lang, "words");
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.status.title")}</CardTitle>
          <StatusForm lang={lang} templateId={id} formValue={value} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label={t("form.status.revocable.label")} Icon={BadgeX}>
          <p className="text-sm">
            {value?.revocable ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.status.suspendable.label")} Icon={OctagonPause}>
          <p className="text-sm">
            {value?.suspendable ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.status.default.label")} Icon={Waypoints}>
          <p>{value?.defaultState ?? tWord("active")}</p>
        </Field>
        <Field
          label={t("form.status.states.label")}
          Icon={Waypoints}
          type="vertical"
        >
          <ChipList items={value?.states ?? []} />
        </Field>
      </CardContent>
    </Card>
  );
}
