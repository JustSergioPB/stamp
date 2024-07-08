import Field from "@components/stamp/field";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { ValidityZod } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";
import { Pencil, Timer } from "lucide-react";
import ValdityForm from "./validity-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  value: ValidityZod | undefined;
  id: string;
}

export default async function ValidityCard({
  lang,
  value,
  id,
  className,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tWord } = await useTranslation(lang, "words");

  function getValidityString() {
    if (!value) return t("form.validity.notSet");

    const { years, months, days, hours, mins, secs } = value;

    if (!years && !months && !days && !hours && !mins && !secs) {
      return t("form.validity.notExpires");
    }

    let str = "";

    if (years) str += `${years}a `;
    if (months) str += `${months}m `;
    if (days) str += `${days}d `;
    if (hours) str += `${hours}h `;
    if (mins) str += `${mins}m `;
    if (secs) str += `${secs}s `;

    return str;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.validity.title")}</CardTitle>
          <ValdityForm lang={lang} templateId={id} formValue={value} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label={tWord("expiresIn")} Icon={Timer}>
          <p className="text-sm">{getValidityString()}</p>
        </Field>
      </CardContent>
    </Card>
  );
}
