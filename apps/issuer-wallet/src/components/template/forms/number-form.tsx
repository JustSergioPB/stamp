import { Checkbox } from "@components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useTranslation } from "@i18n/client";
import { TemplateSchema } from "@schemas/template";
import { Control, FieldPath } from "react-hook-form";

type Props = {
  control?: Control<TemplateSchema, any>;
  lang: string;
  prefix: string;
  integer?: boolean;
};

export default function NumberForm({ control, lang, prefix }: Props) {
  const { t } = useTranslation(lang, "template");
  const minimumPath = `${prefix}.minimum` as FieldPath<TemplateSchema>;
  const exclusiveMinimumPath =
    `${prefix}.exclusiveMinimum` as FieldPath<TemplateSchema>;
  const maximumPath = `${prefix}.maximum` as FieldPath<TemplateSchema>;
  const exclusiveMaximumPath =
    `${prefix}.exclusiveMaximum` as FieldPath<TemplateSchema>;
  const multipleOfPath = `${prefix}.multipleOf` as FieldPath<TemplateSchema>;

  return (
    <div className="flex items-start gap-2">
      <div className="basis-1/2 space-y-2">
        <FormField
          control={control}
          name={minimumPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.content.number.minimum")}</FormLabel>
              <FormControl>
                <Input placeholder={"0"} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={exclusiveMinimumPath}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel>
                    {t("form.content.number.exclusive")}
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="basis-1/2 space-y-2">
        <FormField
          control={control}
          name={maximumPath}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.content.number.maximum")}</FormLabel>
              <FormControl>
                <Input placeholder={"0"} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={exclusiveMaximumPath}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel>
                    {t("form.content.number.exclusive")}
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={multipleOfPath}
        render={({ field }) => (
          <FormItem className="basis-1/2">
            <FormLabel>{t("form.content.number.multipleOf")}</FormLabel>
            <FormControl>
              <Input placeholder={"0"} type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
