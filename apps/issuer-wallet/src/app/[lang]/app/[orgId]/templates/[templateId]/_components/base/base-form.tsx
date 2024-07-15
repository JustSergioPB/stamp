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
import { LoaderCircle, Pencil } from "lucide-react";
import { useState } from "react";
import {
  BaseZod,
  defaultBaseZod,
  baseZod,
} from "@features/credentials/template/models";
import { Textarea } from "@components/ui/textarea";
import { toast } from "sonner";
import { updateTemplateAction } from "@features/credentials/template/actions";
import IdForm from "../id-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  formValue?: BaseZod;
  disabled?: boolean;
}

export default function BaseForm({
  lang,
  templateId,
  formValue,
  disabled,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tLang } = useTranslation(lang, "langs");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<BaseZod>({
    resolver: zodResolver(baseZod),
    defaultValues: formValue ?? defaultBaseZod,
  });

  async function onSubmit(data: BaseZod) {
    setLoading(true);

    const result = await updateTemplateAction(templateId, { base: data });

    setLoading(false);

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
      setOpen(false);
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.base.title")}</DialogTitle>
          <DialogDescription>{t("form.base.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="max-h-[70vh] overflow-y-auto space-y-4">
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
                    <FormDescription>
                      {t("form.base.type.hint")}
                    </FormDescription>
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
              <IdForm control={form.control} lang={lang} />
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                type="reset"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                {tAction("cancel")}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                )}
                {tAction("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
