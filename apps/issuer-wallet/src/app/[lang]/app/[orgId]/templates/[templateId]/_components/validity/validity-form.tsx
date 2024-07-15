"use client";

import { updateTemplateAction } from "@features/credentials/template/actions/template.actions";
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
import { LoaderCircle, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  defaultValiditySchema,
  ValidityZod,
  validityZod,
} from "@features/credentials/template/models";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  lang: string;
  templateId: string;
  formValue?: ValidityZod;
  disabled?: boolean;
}

export default function ValdityForm({
  lang,
  templateId,
  formValue,
  disabled,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<ValidityZod>({
    resolver: zodResolver(validityZod),
    defaultValues: formValue ?? defaultValiditySchema,
  });

  async function onSubmit(data: ValidityZod) {
    setLoading(true);

    const result = await updateTemplateAction(templateId, {
      validity: data,
    });

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
          <DialogTitle>{t("form.validity.title")}</DialogTitle>
          <DialogDescription>{t("form.validity.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem className="w-16">
                    <FormLabel>{t("form.validity.years.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"0"}
                        type="number"
                        min={0}
                        {...field}
                      />
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
