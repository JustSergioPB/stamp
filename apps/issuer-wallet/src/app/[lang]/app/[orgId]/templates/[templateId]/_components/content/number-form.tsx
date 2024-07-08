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
import { useTranslation } from "@i18n/client";
import { useFormContext } from "react-hook-form";

type Props = {
  lang: string;
  prefix: string;
  integer?: boolean;
};

export default function NumberForm({ lang, prefix }: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation(lang, "template");

  const minimumPath = `${prefix}.minimum`;
  const exclusiveMinimumPath = `${prefix}.exclusiveMinimum`;
  const maximumPath = `${prefix}.maximum`;
  const exclusiveMaximumPath = `${prefix}.exclusiveMaximum`;
  const multipleOfPath = `${prefix}.multipleOf`;

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
