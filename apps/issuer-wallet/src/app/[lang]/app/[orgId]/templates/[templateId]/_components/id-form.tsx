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
import { IdZod } from "@features/credentials/template/models/zod/id.zod";
import { useTranslation } from "@i18n/client";
import { idTypes } from "@stamp/domain";
import { Control } from "react-hook-form";

type Props = {
  control?: Control<{ id?: IdZod }, any>;
  lang: string;
};

//TODO: Change label depending on template or credentialSubject
export default function IdForm({ control, lang }: Props) {
  const { t } = useTranslation(lang, "template");
  return (
    <>
      <FormField
        control={control}
        name="id.present"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between space-x-2">
                <div className="basis-5/6">
                  <FormLabel htmlFor="present">
                    {t("form.base.id.present.label")}
                  </FormLabel>
                  <FormDescription>
                    {t("form.base.id.present.description")}
                  </FormDescription>
                </div>
                <Switch
                  id="present"
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
        name="id.type"
        render={({ field }) => (
          <FormItem className="basis-2/3">
            <FormLabel>{t("form.base.id.type.label")}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("form.base.id.type.label")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {idTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`id.${type.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
