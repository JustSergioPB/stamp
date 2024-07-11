"use client";

import { Control, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { CirclePlus, LoaderCircle, Pencil } from "lucide-react";
import { useTranslation } from "@i18n/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import ObjectForm from "./object-form";
import {
  createTemplateAction,
  updateContentAction,
} from "@features/credentials/template/actions";
import {
  ContentZod,
  IdZod,
  contentZod,
  defaultContentZod,
} from "@features/credentials/template/models";
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
import { Switch } from "@components/ui/switch";
import { useRouter } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  lang: string;
  templateId: string;
  orgId: string;
  formValue?: ContentZod;
  disabled?: boolean;
}

//TODO: Patch min 1 error
export default function ContentForm({
  lang,
  templateId,
  orgId,
  formValue,
  disabled,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<ContentZod>({
    resolver: zodResolver(contentZod),
    defaultValues: formValue ?? defaultContentZod,
  });

  async function onSubmit() {
    setLoading(true);

    const result = formValue
      ? await updateContentAction(templateId, form.getValues())
      : await createTemplateAction(form.getValues());

    setLoading(false);

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
      setOpen(false);

      if (!formValue)
        router.push(`/${lang}/app/${orgId}/templates/${result.data}`);
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button
          variant={formValue ? "ghost" : "default"}
          size={formValue ? "icon" : "sm"}
          disabled={disabled}
        >
          {formValue ? (
            <Pencil className="h-4 w-4" />
          ) : (
            <CirclePlus className="h-4 w-4 mr-2" />
          )}
          {!formValue && t("add")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.content.title")}</DialogTitle>
          <DialogDescription>{t("form.content.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="max-h-[70vh] overflow-y-auto space-y-4">
              <IdForm
                control={
                  form.control as unknown as Control<{ id?: IdZod }, any>
                }
                lang={lang}
              />
              <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <FormLabel htmlFor="isAnonymous">
                            {t("form.content.isAnonymous.label")}
                          </FormLabel>
                          <FormDescription>
                            {t("form.content.isAnonymous.description")}
                          </FormDescription>
                        </div>
                        <Switch
                          id="isAnonymous"
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
                name="credentialSubject.properties"
                render={({ fieldState }) => (
                  <FormItem
                    className={"grow shrink-0 basis-auto flex flex-col"}
                  >
                    <FormLabel>{t("form.content.title")}</FormLabel>
                    <FormControl>
                      <ObjectForm
                        prefix="credentialSubject.properties"
                        lang={lang}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>
                        {t(
                          fieldState.error.message ??
                            "form.content.errors.credentialSubject.invalid"
                        )}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
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
