import Field from "@components/stamp/field";
import StatusBadge from "@components/stamp/status-badge";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { useTranslation } from "@i18n/server";
import { TemplateSummary } from "@models/domain/template";
import { Calendar, Loader, User } from "lucide-react";

type Props = {
  lang: string;
  summary: TemplateSummary;
};

export default async function Summary({ lang, summary }: Props) {
  const { t: tCredential } = await useTranslation(lang, "credential");
  const { t } = await useTranslation(lang, "template");
  const { name, id, modifiedAt, createdAt, status } = summary;
  return (
    <>
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-2">{name}</h1>
          <span className="text-xs p-2 bg-muted rounded-lg">{id}</span>
        </div>
        <Button size="sm" disabled={status !== "ready"}>
          {tCredential("actions.create")}
        </Button>
      </section>
      <Separator />
      <section className="flex gap-16">
        <div className="space-y-4 basis-1/4">
          <Field label={t("summary.createdAt")} Icon={Calendar}>
            <p>{createdAt}</p>
          </Field>
          <Field label={t("summary.modifiedAt")} Icon={Calendar}>
            <p>{modifiedAt}</p>
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
        </div>
        <div></div>
      </section>
      <Separator />
    </>
  );
}
