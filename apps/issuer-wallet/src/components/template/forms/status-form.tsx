"use client";

import ChipInput from "@components/stamp/chip-input";
import {
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
import { useTranslation } from "@i18n/client";
import { TemplateSchema } from "@schemas/template";
import { Control, UseFormWatch } from "react-hook-form";

type Props = {
  watch: UseFormWatch<TemplateSchema>;
  control?: Control<TemplateSchema, any>;
  lang: string;
};
export default function StatusForm({ control, lang, watch }: Props) {
  const { t } = useTranslation(lang, "template");
  const statusList = watch("status.states");

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="space-y-4">
        <FormField
          control={control}
          name="status.revocable"
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
          control={control}
          name="status.suspendable"
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
          control={control}
          name="status.states"
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
          control={control}
          name="status.defaultState"
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
      </div>
    </div>
  );
}
