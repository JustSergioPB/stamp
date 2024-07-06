"use client";

import { Control, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@lib/utils";
import { useTranslation } from "@i18n/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import ObjectNode from "./object-node";
import { updateTemplateAction } from "@features/credentials/template/actions";
import {
  ContentZod,
  IdZod,
  contentZod,
  defaultContentZod,
} from "@features/credentials/template/models";
import IdForm from "./id-form";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  lang: string;
  templateId: string;
  formValue?: ContentZod;
}

export default function ContentForm({
  className,
  lang,
  templateId,
  formValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ContentZod>({
    resolver: zodResolver(contentZod),
    defaultValues: formValue ?? defaultContentZod,
  });

  async function onSubmit() {
    setLoading(true);

    const result = await updateTemplateAction(templateId, {
      content: form.getValues(),
    });

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <IdForm
          control={form.control as unknown as Control<{ id?: IdZod }, any>}
          lang={lang}
        />
        <FormField
          control={form.control}
          name="credentialSubject.properties"
          render={({ fieldState }) => (
            <FormItem
              className={cn(
                className,
                "grow shrink-0 basis-auto flex flex-col"
              )}
            >
              <FormLabel>{t("form.content.title")}</FormLabel>
              <FormControl>
                <ObjectNode prefix="credentialSubject.properties" lang={lang} />
              </FormControl>
              {fieldState.error && (
                <FormMessage>
                  {t(
                    fieldState.error.message ??
                      "form.content.errors.credentialSubject.invalid"
                  )}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
