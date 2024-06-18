"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useTranslation } from "@i18n/client";
import { TemplateSchema } from "@schemas/template";
import { Control } from "react-hook-form";

type Props = {
  control?: Control<TemplateSchema, any>;
  lang: string;
};

export default function ValdityForm({ control, lang }: Props) {
  const { t } = useTranslation(lang, "template");
  return (
    <div className="flex items-center gap-2">
      <FormField
        control={control}
        name="validity.years"
        render={({ field }) => (
          <FormItem className="w-16">
            <FormLabel>{t("form.validity.years.label")}</FormLabel>
            <FormControl>
              <Input placeholder={"0"} type="number" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="validity.months"
        render={({ field }) => (
          <FormItem className="w-16">
            <FormLabel>{t("form.validity.months.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={"0"}
                type="number"
                min={0}
                max={11}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="validity.days"
        render={({ field }) => (
          <FormItem className="w-16">
            <FormLabel>{t("form.validity.days.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={"0"}
                type="number"
                min={0}
                max={30}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="validity.hours"
        render={({ field }) => (
          <FormItem className="w-16">
            <FormLabel>{t("form.validity.hours.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={"0"}
                type="number"
                min={0}
                max={23}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="validity.mins"
        render={({ field }) => (
          <FormItem className="w-16">
            <FormLabel>{t("form.validity.mins.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={"0"}
                type="number"
                min={0}
                max={59}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="validity.secs"
        render={({ field }) => (
          <FormItem className="w-16">
            <FormLabel>{t("form.validity.secs.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={"0"}
                type="number"
                min={0}
                max={59}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
