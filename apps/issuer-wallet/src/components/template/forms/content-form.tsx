"use client";

import { useFieldArray, useForm } from "react-hook-form";
import TreeAngle from "@components/stamp/tree-angle";
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
import { ContentSchema, contentSchema } from "@schemas/template";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ContentNode from "./content-node";
import { updateTemplateAction } from "@actions/template.action";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  contentValue?: ContentSchema;
}

export default function ContentForm({
  className,
  lang,
  templateId,
  contentValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ContentSchema>({
    resolver: zodResolver(contentSchema),
    defaultValues: contentValue,
  });

  async function onSubmit(data: ContentSchema) {
    try {
      setLoading(true);
      await updateTemplateAction(templateId, { content: data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
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
          name="credentialSubject"
          render={() => (
            <FormItem
              className={cn(
                className,
                "grow shrink-0 basis-auto flex flex-col"
              )}
            >
              <FormLabel>{t("form.content.title")}</FormLabel>
              <FormControl>
                <ContentNode
                  prefix="credentialSubject"
                  watch={form.watch}
                  lang={lang}
                  control={form.control}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
