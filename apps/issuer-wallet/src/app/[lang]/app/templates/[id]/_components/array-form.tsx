"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import { useTranslation } from "@i18n/client";
import { ContentSchema } from "@schemas/template";
import { Control, FieldPath } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentSchema, any>;
  lang: string;
  prefix: string;
}

export default function ArrayForm({ control, lang, prefix }: Props) {
  const { t } = useTranslation(lang, "template");
  const minItemsPath = `${prefix}.minItems` as FieldPath<ContentSchema>;
  const maxItemsPath = `${prefix}.maxItems` as FieldPath<ContentSchema>;
  const uniqueItemsPath = `${prefix}.uniqueItems` as FieldPath<ContentSchema>;

  return (
    <>
      <FormField
        control={control}
        name={uniqueItemsPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="unique">
                  {t("form.content.array.unique")}
                </FormLabel>
                <Switch
                  id="unique"
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
        name={minItemsPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel>{t("form.content.array.minItems")}</FormLabel>
                <Input
                  placeholder={"0"}
                  type="number"
                  className="basis-2/3"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={maxItemsPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel>{t("form.content.array.maxItems")}</FormLabel>
                <Input
                  placeholder={"0"}
                  type="number"
                  className="basis-2/3"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
