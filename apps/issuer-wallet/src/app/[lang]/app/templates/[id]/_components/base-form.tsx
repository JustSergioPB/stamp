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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@lib/utils";
import { BaseSchema, DefaultBaseSchema, baseSchema } from "@schemas/template";
import { updateTemplateCommand } from "@commands/template.commands";
import { Switch } from "@components/ui/switch";
import { Textarea } from "@components/ui/textarea";
import { toast } from "sonner";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  formValue?: BaseSchema;
}

export default function BaseForm({
  lang,
  className,
  templateId,
  formValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tLang } = useTranslation(lang, "langs");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<BaseSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: formValue ?? DefaultBaseSchema,
  });

  async function onSubmit(data: BaseSchema) {
    setLoading(true);

    const result = await updateTemplateCommand({ id: templateId, base: data });

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
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="basis-7/12">
                <FormLabel>{t("form.base.name.label")}</FormLabel>
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
                <FormLabel>{t("form.base.lang.label")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
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
              <FormLabel>{t("form.base.type.label")}</FormLabel>
              <FormControl>
                <ChipInput
                  defaultValue={field.value}
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.base.description.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.base.description.placeholder")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("form.base.description.hint")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id.present"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-between space-x-2">
                  <div className="basis-5/6">
                    <FormLabel htmlFor="present">
                      {t("form.base.id.present.label")}
                    </FormLabel>
                    <FormDescription>
                      {t("form.base.id.present.description")}
                    </FormDescription>
                  </div>
                  <Switch
                    id="present"
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
          control={form.control}
          name="id.type"
          render={({ field }) => (
            <FormItem className="basis-2/3">
              <FormLabel>{t("form.base.id.type.label")}</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={"URL"}
                disabled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("form.base.id.type.label")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["URL", "did", "uuid"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {tLang(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
