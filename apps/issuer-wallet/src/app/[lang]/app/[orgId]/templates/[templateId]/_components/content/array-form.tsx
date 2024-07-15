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
import { useFormContext } from "react-hook-form";
import NumberForm from "./number-form";
import StringForm from "./string-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Separator } from "@components/ui/separator";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  prefix: string;
  // eslint-disable-next-line no-unused-vars
  onSubTypeChange?: (type: JsonSchemaType) => void;
}

export default function ArrayForm({ lang, prefix, onSubTypeChange }: Props) {
  const { t } = useTranslation(lang, "template");
  const { control, watch } = useFormContext();

  const minItemsPath = `${prefix}.minItems`;
  const maxItemsPath = `${prefix}.maxItems`;
  const uniqueItemsPath = `${prefix}.uniqueItems`;
  const subtypePath = `${prefix}.items.type`;

  const subtype = watch(subtypePath) as JsonSchemaType;

  function renderForm() {
    switch (subtype) {
      case "array":
        return <ArrayForm lang={lang} prefix={`${prefix}.items`} />;
      case "number":
        return <NumberForm lang={lang} prefix={`${prefix}.items`} />;
      case "integer":
        return <NumberForm lang={lang} prefix={`${prefix}.items`} />;
      case "string":
        return <StringForm lang={lang} prefix={`${prefix}.items`} />;
      default:
        return <></>;
    }
  }

  return (
    <>
      <FormField
        control={control}
        name={subtypePath}
        render={({ field, fieldState }) => (
          <FormItem>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onSubTypeChange && onSubTypeChange(value as JsonSchemaType);
              }}
              value={field.value}
            >
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
      {(subtype === "string" ||
        subtype === "number" ||
        subtype === "integer" ||
        subtype === "array") && (
        <>
          <Separator />
          {renderForm()}
        </>
      )}
    </>
  );
}
