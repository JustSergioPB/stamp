"use client";

import { updateTemplateAction } from "@actions/template.action";
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
import { SecuritySchema, securitySchema } from "@schemas/template";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  securityValue?: SecuritySchema;
}

export default function SecurityForm({
  lang,
  className,
  templateId,
  securityValue,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SecuritySchema>({
    resolver: zodResolver(securitySchema),
    defaultValues: securityValue,
  });

  async function onSubmit(data: SecuritySchema) {
    try {
      setLoading(true);
      await updateTemplateAction(templateId, { security: data });
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
          {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
          {tAction("save")}
        </Button>
      </form>
    </Form>
  );
}
