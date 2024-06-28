"use client";

import { updateTemplateCommand } from "src/features/template/commands/template.commands";
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
import { cn } from "@lib/utils";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SecurityZod, securityZod } from "@features/template/models";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  formValue?: SecurityZod;
}

export default function SecurityForm({
  lang,
  className,
  templateId,
  formValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SecurityZod>({
    resolver: zodResolver(securityZod),
    defaultValues: formValue,
  });

  async function onSubmit(data: SecurityZod) {
    setLoading(true);

    const result = await updateTemplateCommand(templateId, {
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
    <Form {...form}>
      <form
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <Button type="submit" disabled={loading}>
          {loading && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
