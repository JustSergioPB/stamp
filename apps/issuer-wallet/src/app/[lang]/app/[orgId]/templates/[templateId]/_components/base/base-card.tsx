import ChipList from "@components/stamp/chip-list";
import Field from "@components/stamp/field";
import StatusBadge from "@components/stamp/status-badge";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { BaseZod } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";
import {
  Pencil,
  CirclePlus,
  FileSignature,
  Loader,
  Languages,
  FileQuestion,
  Fingerprint,
  Text,
} from "lucide-react";
import BaseForm from "./base-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  value: BaseZod | undefined;
  id: string;
  hasContent: boolean;
}

export default async function BaseCard({
  lang,
  value,
  id,
  hasContent,
  className,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tLang } = await useTranslation(lang, "langs");
  const { t: tWord } = await useTranslation(lang, "words");

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{value?.name ?? id}</CardTitle>
          <div className="flex items-center gap-4">
            <BaseForm lang={lang} templateId={id} formValue={value} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field type="vertical" label={t("summary.description")} Icon={Text}>
          <p className="text-sm">{value?.description}</p>
        </Field>
        <Field type="vertical" label={t("summary.type")} Icon={FileSignature}>
          <ChipList items={value?.type ?? []} />
        </Field>
        <div className="flex gap-8">
          <div className="space-y-4 basis-1/2">
            <h3>{tWord("summary")}</h3>
            <Field label={t("summary.status")} Icon={Loader}>
              <StatusBadge
                value={t(hasContent ? "status.ready" : "status.notReady")}
                variant={hasContent ? "success" : "base"}
              />
            </Field>
            <Field label={t("summary.lang")} Icon={Languages}>
              <p className="text-sm">{value?.lang ? tLang(value?.lang) : ""}</p>
            </Field>
          </div>
          <div className="space-y-4 basis-1/2">
            <h3>{tWord("identification")}</h3>
            <div className="space-y-4">
              <Field label={tWord("identifiable")} Icon={FileQuestion}>
                <p className="text-sm">
                  {value?.id?.present ? tWord("yes") : tWord("no")}
                </p>
              </Field>
              <Field label={tWord("idType")} Icon={Fingerprint}>
                <p className="text-sm">
                  {value?.id?.type
                    ? t(`id.${value?.id?.type.toLowerCase()}`)
                    : ""}
                </p>
              </Field>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
