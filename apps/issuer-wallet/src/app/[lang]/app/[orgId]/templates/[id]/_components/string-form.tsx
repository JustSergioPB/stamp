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
import { useFormContext } from "react-hook-form";

type Props = {
  lang: string;
  prefix: string;
};

export default function StringForm({ lang, prefix }: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation(lang, "template");

  const minLengthPath = `${prefix}.minLength`;
  const maxLengthPath = `${prefix}.maxLength`;
  const patternPath = `${prefix}.pattern`;
  const formatPath = `${prefix}.format`;

  return (
    <>
      <FormField
        control={control}
        name={minLengthPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel>{t("form.content.string.minimum")}</FormLabel>
                <Input
                  className="basis-2/3"
                  placeholder={"0"}
                  type="number"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={maxLengthPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <FormLabel>{t("form.content.string.maximum")}</FormLabel>
                <Input
                  placeholder={"0"}
                  type="number"
                  className="basis-2/3"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={patternPath}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between gap-2">
                <FormLabel>{t("form.content.string.pattern")}</FormLabel>
                <Input
                  className="basis-2/3"
                  placeholder={
                    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                  }
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={formatPath}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{t("form.content.string.format")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="basis-2/3">
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
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
