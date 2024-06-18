"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Label } from "@components/ui/label";
import { Switch } from "@components/ui/switch";
import { useTranslation } from "@i18n/client";
import { TemplateSchema } from "@schemas/template";
import { Control } from "react-hook-form";

type Props = {
  control?: Control<TemplateSchema, any>;
  lang: string;
};

export default function SecurityForm({ control, lang }: Props) {
  const { t } = useTranslation(lang, "template");
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="security.authorization"
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
        control={control}
        name="security.assertion"
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
        control={control}
        name="security.keyAgreement"
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
        control={control}
        name="security.capabilityInvocation"
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
        control={control}
        name="security.capabilityDelegation"
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
    </div>
  );
}
