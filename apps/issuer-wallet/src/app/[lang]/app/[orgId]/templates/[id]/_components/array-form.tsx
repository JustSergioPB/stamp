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
import { JSONSchemaTypes, JsonSchemaType } from "@stamp/domain";
import { Control, FieldPath, UseFormWatch } from "react-hook-form";
import NumberForm from "./number-form";
import StringForm from "./string-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { ContentZod } from "@features/credentials/template/models";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentZod, any>;
  lang: string;
  prefix: string;
  watch: UseFormWatch<ContentZod>;
}

export default function ArrayForm({ control, lang, prefix, watch }: Props) {
  const { t } = useTranslation(lang, "template");
  const minItemsPath = `${prefix}.minItems` as FieldPath<ContentZod>;
  const maxItemsPath = `${prefix}.maxItems` as FieldPath<ContentZod>;
  const uniqueItemsPath = `${prefix}.uniqueItems` as FieldPath<ContentZod>;
  const subtypePath = `${prefix}.items.type` as FieldPath<ContentZod>;

  const subtype = watch(subtypePath) as JsonSchemaType;

  function renderForm() {
    switch (subtype) {
      case "array":
        return (
          <ArrayForm
            control={control}
            lang={lang}
            prefix={`${prefix}.items`}
            watch={watch}
          />
        );
      case "number":
        return (
          <NumberForm
            control={control}
            lang={lang}
            prefix={`${prefix}.items`}
          />
        );
      case "integer":
        return (
          <NumberForm
            control={control}
            lang={lang}
            prefix={`${prefix}.items`}
          />
        );
      case "string":
        return (
          <StringForm
            control={control}
            lang={lang}
            prefix={`${prefix}.items`}
          />
        );
      default:
        return <></>;
    }
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
      <FormField
        control={control}
        name={subtypePath}
        render={({ field, fieldState }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <div className="flex items-center justify-between">
                  <FormLabel>{t("form.content.array.subtype.label")}</FormLabel>
                  <SelectTrigger className="basis-2/3">
                    <SelectValue
                      placeholder={t("form.content.array.subtype.label")}
                    />
                  </SelectTrigger>
                </div>
              </FormControl>
              <SelectContent>
                {JSONSchemaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t("form.content.types." + type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error?.message && (
              <FormMessage>{t(fieldState.error?.message)}</FormMessage>
            )}
          </FormItem>
        )}
      />
      {(subtype === "string" ||
        subtype === "number" ||
        subtype === "integer" ||
        subtype === "array") && (
        <div>
          <h5 className="my-4">{t("form.content.array.subtype.properties")}</h5>
          <div className="space-y-2">{renderForm()}</div>
        </div>
      )}
    </>
  );
}
