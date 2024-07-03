"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import { ContentZod } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/client";
import { Control, FieldPath } from "react-hook-form";

type Props = {
  control?: Control<ContentZod, any>;
  lang: string;
  prefix: string;
  integer?: boolean;
};

export default function NumberForm({ control, lang, prefix }: Props) {
  const { t } = useTranslation(lang, "template");
  const minimumPath = `${prefix}.minimum` as FieldPath<ContentZod>;
  const exclusiveMinimumPath =
    `${prefix}.exclusiveMinimum` as FieldPath<ContentZod>;
  const maximumPath = `${prefix}.maximum` as FieldPath<ContentZod>;
  const exclusiveMaximumPath =
    `${prefix}.exclusiveMaximum` as FieldPath<ContentZod>;
  const multipleOfPath = `${prefix}.multipleOf` as FieldPath<ContentZod>;

  return (
    <>
      <FormField
        control={control}
        name={multipleOfPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel>{t("form.content.number.multipleOf")}</FormLabel>
                <Input
                  className="basis-2/3"
                  placeholder={"0"}
                  type="number"
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
        name={minimumPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel>{t("form.content.number.minimum")}</FormLabel>
                <Input
                  className="basis-2/3"
                  placeholder={"0"}
                  type="number"
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
        name={maximumPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel>{t("form.content.number.maximum")}</FormLabel>
                <Input
                  className="basis-2/3"
                  placeholder={"0"}
                  type="number"
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
        name={exclusiveMinimumPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex justify-between items-center">
                <FormLabel htmlFor="exclusiveMinimum">
                  {t("form.content.number.exclusiveMinimum")}
                </FormLabel>
                <Switch
                  id="exclusiveMinimum"
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
        name={exclusiveMaximumPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex justify-between items-center">
                <FormLabel htmlFor="exclusiveMaximum">
                  {t("form.content.number.exclusiveMaximum")}
                </FormLabel>
                <Switch
                  id="exclusiveMaximum"
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
