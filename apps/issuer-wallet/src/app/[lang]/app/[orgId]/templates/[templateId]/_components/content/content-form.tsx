"use client";

import { Control, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { LoaderCircle, Pencil } from "lucide-react";
import { useTranslation } from "@i18n/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import ObjectForm from "./object-form";
import { updateContentAction } from "@features/credentials/template/actions";
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

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  lang: string;
  templateId: string;
  formValue?: ContentZod;
}

//TODO: Patch min 1 error
export default function ContentForm({ lang, templateId, formValue }: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<ContentZod>({
    resolver: zodResolver(contentZod),
    defaultValues: formValue ?? defaultContentZod,
  });

  async function onSubmit() {
    setLoading(true);

    const result = await updateContentAction(templateId, form.getValues());

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
    }

    setLoading(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
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
