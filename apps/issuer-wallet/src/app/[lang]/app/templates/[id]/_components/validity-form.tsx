"use client";

import { updateTemplateCommand } from "src/features/template/commands/template.commands";
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
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ValidityZod, validityZod } from "@features/template/models";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  formValue?: ValidityZod;
}

export default function ValdityForm({
  lang,
  className,
  templateId,
  formValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ValidityZod>({
    resolver: zodResolver(validityZod),
    defaultValues: formValue,
  });

  async function onSubmit(data: ValidityZod) {
    setLoading(true);

    const result = await updateTemplateCommand(templateId, {
      validity: data,
    });

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
    }

    setLoading(false);
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
          {loading && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
