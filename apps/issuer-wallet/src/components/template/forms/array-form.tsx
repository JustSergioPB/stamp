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
import { TemplateSchema } from "@schemas/template";
import { Control, FieldPath, UseFormWatch } from "react-hook-form";
import ObjectForm from "./object-form";
import { useState } from "react";
import NumberForm from "./number-form";
import StringForm from "./string-form";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { JSONSchemaTypes } from "@stamp/domain";

type Props = {
  watch: UseFormWatch<TemplateSchema>;
  control?: Control<TemplateSchema, any>;
  lang: string;
  prefix: string;
};

export default function ArrayForm({ control, lang, prefix, watch }: Props) {
  const { t } = useTranslation(lang, "template");
  const itemsPath = `${prefix}.items` as FieldPath<TemplateSchema>;
  const minItemsPath = `${prefix}.minItems` as FieldPath<TemplateSchema>;
  const maxItemsPath = `${prefix}.maxItems` as FieldPath<TemplateSchema>;
  const uniqueItemsPath = `${prefix}.uniqueItems` as FieldPath<TemplateSchema>;
  const [type, setType] = useState<string>();

  function renderForm() {
    let form: JSX.Element;

    switch (type) {
      case "object":
        form = (
          <>
            <span className="text-sm text-muted-foreground">
              {t("form.content.array.contentProperties")}
            </span>
            <ObjectForm
              control={control}
              lang={lang}
              watch={watch}
              prefix={prefix}
            />
          </>
        );
        break;
      case "array":
        form = (
          <>
            <span className="text-sm text-muted-foreground">
              {t("form.content.array.contentProperties")}
            </span>
            <ArrayForm
              control={control}
              lang={lang}
              watch={watch}
              prefix={prefix}
            />
          </>
        );
        break;
      case "number":
        form = <NumberForm control={control} lang={lang} prefix={itemsPath} />;
        break;
      case "integer":
        form = <NumberForm control={control} lang={lang} prefix={itemsPath} />;
        break;
      case "string":
        form = <StringForm control={control} lang={lang} prefix={itemsPath} />;
        break;
      default:
        form = <></>;
        break;
    }

    return form;
  }

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
      <div className="flex items-center justify-between">
        <Label>{t("form.content.array.type")}</Label>
        <Select onValueChange={(value) => setType(value)}>
          <SelectTrigger className="basis-2/3">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {JSONSchemaTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {t("form.content.types." + type)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {renderForm()}
    </>
  );
}
