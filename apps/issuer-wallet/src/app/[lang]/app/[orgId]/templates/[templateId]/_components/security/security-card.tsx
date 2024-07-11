import Field from "@components/stamp/field";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Template } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";

import {
  FileKey2,
  BadgeCheck,
  Handshake,
  HandCoins,
  Share,
} from "lucide-react";
import SecurityForm from "./security-form";
import { TemplateUtils } from "@features/credentials/template/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  template: Template;
}

export default async function SecurityCard({
  lang,
  template,
  className,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tWord } = await useTranslation(lang, "words");
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.security.title")}</CardTitle>
          <SecurityForm
            lang={lang}
            templateId={template.id}
            formValue={template.security}
            disabled={!TemplateUtils.canEdit(template)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label={t("form.security.authorization.label")} Icon={FileKey2}>
          <p className="text-sm">
            {template.security?.authorization ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.security.assertion.label")} Icon={BadgeCheck}>
          <p className="text-sm">
            {template.security?.assertion ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field label={t("form.security.keyAgreement.label")} Icon={Handshake}>
          <p className="text-sm">
            {template.security?.keyAgreement ? tWord("yes") : tWord("no")}
          </p>
        </Field>
        <Field
          label={t("form.security.capabilityInvocation.label")}
          Icon={HandCoins}
        >
          <p className="text-sm">
            {template.security?.capabilityInvocation
              ? tWord("yes")
              : tWord("no")}
          </p>
        </Field>
        <Field
          label={t("form.security.capabilityDelegation.label")}
          Icon={Share}
        >
          <p className="text-sm">
            {template.security?.capabilityDelegation
              ? tWord("yes")
              : tWord("no")}
          </p>
        </Field>
      </CardContent>
    </Card>
  );
}
