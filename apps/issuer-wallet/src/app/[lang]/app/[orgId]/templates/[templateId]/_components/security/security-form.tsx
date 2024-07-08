"use client";

import { updateTemplateAction } from "@features/credentials/template/actions/template.actions";
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
import { Switch } from "@components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { LoaderCircle, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  SecurityZod,
  securityZod,
} from "@features/credentials/template/models";
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
  formValue?: SecurityZod;
}

export default function SecurityForm({ lang, templateId, formValue }: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<SecurityZod>({
    resolver: zodResolver(securityZod),
    defaultValues: formValue,
  });

  async function onSubmit(data: SecurityZod) {
    setLoading(true);

    const result = await updateTemplateAction(templateId, {
      security: data,
    });

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
          <DialogTitle>{t("form.security.title")}</DialogTitle>
          <DialogDescription>{t("form.security.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="authorization"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="basis-5/6">
                        <FormLabel htmlFor="authorization">
                          {t("form.security.authorization.label")}
                        </FormLabel>
                        <FormDescription>
                          {t("form.security.authorization.description")}
                        </FormDescription>
                      </div>
                      <Switch
                        id="authorization"
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
              name="assertion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="basis-5/6">
                        <FormLabel htmlFor="assertion">
                          {t("form.security.assertion.label")}
                        </FormLabel>
                        <FormDescription>
                          {t("form.security.assertion.description")}
                        </FormDescription>
                      </div>
                      <Switch
                        id="assertion"
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
              name="keyAgreement"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="basis-5/6">
                        <FormLabel htmlFor="keyAgreement">
                          {t("form.security.keyAgreement.label")}
                        </FormLabel>
                        <FormDescription>
                          {t("form.security.keyAgreement.description")}
                        </FormDescription>
                      </div>
                      <Switch
                        id="keyAgreement"
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
              name="capabilityInvocation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="basis-5/6">
                        <FormLabel htmlFor="capabilityInvocation">
                          {t("form.security.capabilityInvocation.label")}
                        </FormLabel>
                        <FormDescription>
                          {t("form.security.capabilityInvocation.description")}
                        </FormDescription>
                      </div>
                      <Switch
                        id="capabilityInvocation"
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
              name="capabilityDelegation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="basis-5/6">
                        <FormLabel htmlFor="capabilityDelegation">
                          {t("form.security.capabilityDelegation.label")}
                        </FormLabel>
                        <FormDescription>
                          {t("form.security.capabilityDelegation.description")}
                        </FormDescription>
                      </div>
                      <Switch
                        id="capabilityDelegation"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
