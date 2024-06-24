"use client";

import { updateTemplateAction } from "@actions/template.action";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { cn } from "@lib/utils";
import { ValiditySchema, validitySchema } from "@schemas/template";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  validityValue?: ValiditySchema;
}

export default function ValdityForm({
  lang,
  className,
  templateId,
  validityValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ValiditySchema>({
    resolver: zodResolver(validitySchema),
    defaultValues: validityValue,
  });

  async function onSubmit(data: ValiditySchema) {
    try {
      setLoading(true);
      await updateTemplateAction(templateId, { validity: data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("space-y-4 overflow-y-auto", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="years"
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
            control={form.control}
            name="months"
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
            control={form.control}
            name="days"
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
            control={form.control}
            name="hours"
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
            control={form.control}
            name="mins"
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
            control={form.control}
            name="secs"
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
        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
