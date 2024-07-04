"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@lib/utils";
import { useTranslation } from "@i18n/client";
import { Switch } from "@components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import ObjectNode from "./object-node";
import { updateTemplateAction } from "@features/credentials/template/actions";
import {
  ContentZod,
  contentZod,
  defaultContentZod,
} from "@features/credentials/template/models";

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

  async function onSubmit(data: ContentZod) {
    setLoading(true);
    console.log("data", form.getValues());

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
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error(errors);
        })}
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-between space-x-2">
                  <div className="basis-5/6">
                    <FormLabel htmlFor="id">
                      {t("form.content.id.label")}
                    </FormLabel>
                    <FormDescription>
                      {t("form.content.id.description")}
                    </FormDescription>
                  </div>
                  <Switch
                    id="id"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
                <ObjectNode
                  prefix="credentialSubject.properties"
                  watch={form.watch}
                  lang={lang}
                  control={form.control}
                />
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
