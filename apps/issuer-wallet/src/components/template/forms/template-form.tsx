"use client";

import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TemplateSchema,
  templateSchema,
} from "@schemas/template/template.schema";
import BaseForm from "./base-form";
import ContentForm from "./content-form";
import { useTranslation } from "@i18n/client";
import SecurityForm from "./security-form";
import StatusForm from "./status-form";
import ValdityForm from "./validity-form";
import { createTemplateAction } from "@actions/template.action";

type Props = {
  onSubmit: () => void;
  onReset: () => void;
  lang: string;
};

export default function TemplateForm({ onSubmit, onReset, lang }: Props) {
  const { t } = useTranslation(lang, "actions");
  const { t: tTemplate } = useTranslation(lang, "template");
  const form = useForm<TemplateSchema>({
    resolver: zodResolver(templateSchema),
  });

  const { watch } = form;

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmitClick(data: TemplateSchema) {
    try {
      setLoading(true);
      await createTemplateAction(data);
      form.reset();
      onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function onResetClick() {
    form.reset();
    onReset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitClick)}
        className="h-full flex flex-col gap-4"
      >
        <div className="grow shrink-0 basis-auto h-0 overflow-auto flex flex-col gap-16 px-1">
          <section>
            <h2 className="text-lg font-semibold mb-2">
              {tTemplate("form.base.title")}
            </h2>
            <BaseForm control={form.control} lang={lang} />
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">
              {tTemplate("form.content.title")}
            </h2>
            <ContentForm control={form.control} lang={lang} />
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">
              {tTemplate("form.security.title")}
            </h2>
            <h3 className="text-sm mb-8 text-muted-foreground">
              {tTemplate("form.security.subtitle")}
            </h3>
            <SecurityForm control={form.control} lang={lang} />
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">
              {tTemplate("form.status.title")}
            </h2>
            <h3 className="text-sm mb-8 text-muted-foreground">
              {tTemplate("form.status.subtitle")}
            </h3>
            <StatusForm control={form.control} lang={lang} watch={watch} />
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">
              {tTemplate("form.validity.title")}
            </h2>
            <h3 className="text-sm mb-8 text-muted-foreground">
              {tTemplate("form.validity.subtitle")}
            </h3>
            <ValdityForm control={form.control} lang={lang} />
          </section>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            type="reset"
            variant="ghost"
            onClick={onResetClick}
            disabled={loading}
          >
            {t("discard")}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
            {t("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
