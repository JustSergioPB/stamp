"use client";

import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Translatable } from "@i18n/types/translatable";
import { DICTIONARIES } from "@i18n/constants/dictionaries.const";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateSchema, templateSchema } from "@schemas/template/template.schema";
import BaseForm from "./base-form";
import ContentForm from "./content-form";

type Props = {
  onSubmit: () => void;
  onReset: () => void;
} & Translatable;

export default function TemplateForm({ onSubmit, onReset, lang }: Props) {
  const form = useForm<TemplateSchema>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      type: [],
      name: "",
      description: "",
      lang: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmitClick(data: TemplateSchema) {
    try {
      setLoading(true);
      //await createSchemaAction(toSchema(data).toPrimitive());
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
        <div className="grow shrink-0 basis-auto h-0 overflow-auto flex flex-col gap-4 px-1">
          <BaseForm control={form.control} />
          <ContentForm control={form.control} />
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            type="reset"
            variant="ghost"
            onClick={onResetClick}
            disabled={loading}
          >
            {DICTIONARIES[lang]?.schemaForm.discard}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
            {DICTIONARIES[lang]?.schemaForm.save}
          </Button>
        </div>
      </form>
    </Form>
  );
}
