"use client";

import { updateTemplateAction } from "@actions/template.action";
import ChipInput from "@components/stamp/chip-input";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Switch } from "@components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { cn } from "@lib/utils";
import { StatusSchema, statusSchema } from "@schemas/template";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  statusValue?: StatusSchema;
}

export default function StatusForm({
  lang,
  className,
  templateId,
  statusValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<StatusSchema>({
    resolver: zodResolver(statusSchema),
    defaultValues: statusValue,
  });

  const statusList = form.watch("states");

  async function onSubmit(data: StatusSchema) {
    try {
      setLoading(true);
      await updateTemplateAction(templateId, { status: data });
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
        <FormField
          control={form.control}
          name="revocable"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="revocable"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel htmlFor="revocable">
                    {t("form.status.revocable.label")}
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="suspendable"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="suspendable"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel htmlFor="suspendable">
                    {t("form.status.suspendable.label")}
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="states"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.status.states.label")}</FormLabel>
              <FormControl className="w-full">
                <ChipInput
                  placeholder={t("form.status.states.placeholder")}
                  onRemove={(value: string[]) => field.onChange(value)}
                  onEnter={(value: string[]) => field.onChange(value)}
                  onReset={() => {
                    field.onChange([]);
                  }}
                />
              </FormControl>
              <FormDescription>{t("form.status.states.hint")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultState"
          render={({ field }) => (
            <FormItem className="basis-5/12">
              <FormLabel>{t("form.status.default.label")}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!statusList?.length}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("form.status.default.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusList?.map((status, index) => (
                    <SelectItem key={`${status}-${index}`} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
