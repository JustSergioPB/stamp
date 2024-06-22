import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { useTranslation } from "@i18n/client";
import { TemplateSchema } from "@schemas/template";
import { Control, FieldPath } from "react-hook-form";

type Props = {
  control?: Control<TemplateSchema, any>;
  lang: string;
  prefix: string;
};

export default function StringForm({ control, lang, prefix }: Props) {
  const { t } = useTranslation(lang, "template");

  const minLengthPath = `${prefix}.minLength` as FieldPath<TemplateSchema>;
  const maxLengthPath = `${prefix}.maxLength` as FieldPath<TemplateSchema>;
  const patternPath = `${prefix}.pattern` as FieldPath<TemplateSchema>;
  const formatPath = `${prefix}.format` as FieldPath<TemplateSchema>;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FormField
          control={control}
          name={minLengthPath}
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>{t("form.content.string.minimum")}</FormLabel>
              <FormControl>
                <Input placeholder={"0"} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={maxLengthPath}
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>{t("form.content.string.maximum")}</FormLabel>
              <FormControl>
                <Input placeholder={"0"} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FormField
          control={control}
          name={patternPath}
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>{t("form.content.string.pattern")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={formatPath}
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>{t("form.content.string.format")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("form.content.string.format")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["date", "time", "date-time", "email", "uri", "did"].map(
                    (format) => (
                      <SelectItem key={format} value={format}>
                        {t("form.content.format." + format)}
                      </SelectItem>
                    )
                  )}
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
