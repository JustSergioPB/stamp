"use client";

import { TemplateSchema } from "@schemas/template/template.schema";
import { Control, UseFormWatch, useFieldArray } from "react-hook-form";
import TreeAngle from "@components/stamp/tree-angle";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@lib/utils";
import { useTranslation } from "@i18n/client";
import { Switch } from "@components/ui/switch";
import JsonForm from "./json-form";

type Props = {
  control?: Control<TemplateSchema, any>;
  watch: UseFormWatch<TemplateSchema>;
  className?: string;
  lang: string;
};

export default function ContentForm({
  control,
  className,
  lang,
  watch,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content.properties.credentialSubject",
  });
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="content.id"
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
        control={control}
        name="content.properties"
        render={() => (
          <FormItem
            className={cn(className, "grow shrink-0 basis-auto flex flex-col")}
          >
            <FormLabel>{t("form.content.title")}</FormLabel>
            <div className="block grow shrink-0 basis-auto">
              <div className="flex">
                <span className="border-l-2 border-l-neutral-300 inline-block"></span>
                <ul className="w-full space-y-6">
                  {fields.map((field, index) => (
                    <li className="flex items-start" key={field.id}>
                      <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
                      <JsonForm
                        lang={lang}
                        watch={watch}
                        className="grow shrink-0 basis-auto"
                        prefix={`content.properties.credentialSubject.${index}`}
                        onRemove={() => remove(index)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <TreeAngle>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={append}
                >
                  <CirclePlus className="h-4 w-4 mr-2" />
                  {t("form.actions.addField")}
                </Button>
              </TreeAngle>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
