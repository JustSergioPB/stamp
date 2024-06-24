"use client";

import {
  Form,
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
import { useForm } from "react-hook-form";
import { useTranslation } from "@i18n/client";
import ChipInput from "@components/stamp/chip-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@lib/utils";
import { BaseSchema, baseSchema } from "@schemas/template";
import { updateTemplateAction } from "@actions/template.action";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  baseValue?: BaseSchema;
}

export default function BaseForm({
  lang,
  className,
  templateId,
  baseValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tLang } = useTranslation(lang, "langs");
  const { t: tAction } = useTranslation(lang, "actions");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<BaseSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: baseValue,
  });

  async function onSubmit(data: BaseSchema) {
    try {
      setLoading(true);
      await updateTemplateAction(templateId, { base: data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
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
            control={form.control}
            name="lang"
            render={({ field }) => (
              <FormItem className="basis-5/12">
                <FormLabel>{t("props.lang")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          control={form.control}
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
        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
