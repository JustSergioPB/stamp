import Field from "@components/stamp/field";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { SecurityZod } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";

import {
  Pencil,
  FileKey2,
  BadgeCheck,
  Handshake,
  HandCoins,
  Share,
} from "lucide-react";
import SecurityForm from "./security-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  value: SecurityZod | undefined;
  id: string;
}

export default async function SecurityCard({
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
          <CardTitle>{t("form.security.title")}</CardTitle>
          <SecurityForm lang={lang} templateId={id} formValue={value} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label={t("form.security.authorization.label")} Icon={FileKey2}>
          <p className="text-sm">
            {value?.authorization ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.security.assertion.label")} Icon={BadgeCheck}>
          <p className="text-sm">
            {value?.assertion ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.security.keyAgreement.label")} Icon={Handshake}>
          <p className="text-sm">
            {value?.keyAgreement ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field
          label={t("form.security.capabilityInvocation.label")}
          Icon={HandCoins}
        >
          <p className="text-sm">
            {value?.capabilityInvocation ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field
          label={t("form.security.capabilityDelegation.label")}
          Icon={Share}
        >
          <p className="text-sm">
            {value?.capabilityDelegation ? tWord("yes") : tWord("no")}
          </p>
        </Field>
      </CardContent>
    </Card>
  );
}
