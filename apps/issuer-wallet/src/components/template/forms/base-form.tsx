"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Control } from "react-hook-form";
import { TemplateSchema } from "@schemas/template/template.schema";
import { useTranslation } from "@i18n/client";
import ChipInput from "@components/stamp/chip-input";

type Props = {
  control?: Control<TemplateSchema, any>;
  lang: string;
};

export default function BaseForm({ control, lang }: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tLang } = useTranslation(lang, "langs");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="basis-7/12">
              <FormLabel>{t("props.name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.base.name.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lang"
          render={({ field }) => (
            <FormItem className="basis-5/12">
              <FormLabel>{t("props.lang")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("form.base.lang.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["en", "es"].map((schemaLang) => (
                    <SelectItem key={schemaLang} value={schemaLang}>
                      {tLang(schemaLang)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("props.type")}</FormLabel>
            <FormControl>
              <ChipInput
                placeholder={t("form.base.type.placeholder")}
                onRemove={(value: string[]) => field.onChange(value)}
                onEnter={(value: string[]) => field.onChange(value)}
                onReset={() => {
                  field.onChange([]);
                }}
              />
            </FormControl>
            <FormDescription>{t("form.base.type.hint")}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
