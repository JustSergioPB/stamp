"use client";

import { Button } from "@components/ui/button";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@components/ui/collapsible";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { cn } from "@lib/utils";
import { TemplateSchema } from "@schemas/template";
import { ChevronsUpDown, Trash } from "lucide-react";
import { useState } from "react";
import { Control, FieldPath, UseFormWatch } from "react-hook-form";
import { JSONSchemaTypes, JsonSchemaType } from "@stamp/domain";
import { Switch } from "@components/ui/switch";
import ObjectForm from "./object-form";
import ArrayForm from "./array-form";
import NumberForm from "./number-form";
import StringForm from "./string-form";

type Props = {
  className?: string;
  control?: Control<TemplateSchema, any>;
  watch: UseFormWatch<TemplateSchema>;
  lang: string;
  prefix: string;
  onRemove: () => void;
};

export default function JsonForm({
  className,
  control,
  lang,
  onRemove,
  prefix,
  watch,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { t } = useTranslation(lang, "template");

  const namePath = `${prefix}.name` as FieldPath<TemplateSchema>;
  const typePath = `${prefix}.type` as FieldPath<TemplateSchema>;
  const requiredPath = `${prefix}.required` as FieldPath<TemplateSchema>;

  const fieldValue = watch(typePath) as JsonSchemaType;

  function renderForm() {
    let form: JSX.Element;

    switch (fieldValue) {
      case "object":
        form = (
          <ObjectForm
            control={control}
            lang={lang}
            watch={watch}
            prefix={prefix}
          />
        );
        break;
      case "array":
        form = (
          <ArrayForm
            control={control}
            lang={lang}
            watch={watch}
            prefix={prefix}
          />
        );
        break;
      case "number":
        form = <NumberForm control={control} lang={lang} prefix={prefix} />;
        break;
      case "integer":
        form = <NumberForm control={control} lang={lang} prefix={prefix} />;
        break;
      case "string":
        form = <StringForm control={control} lang={lang} prefix={prefix} />;
        break;
      default:
        form = <></>;
        break;
    }

    return form;
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(className, "space-y-4")}
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center gap-4">
          <FormField
            control={control}
            name={namePath}
            render={({ field }) => (
              <FormItem className="w-56">
                <FormControl>
                  <Input
                    placeholder={t("form.base.name.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={typePath}
            render={({ field }) => (
              <FormItem className="w-32">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {JSONSchemaTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {t("form.content.types." + type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <Button
            className="shrink-0 basis-auto grow"
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CollapsibleContent className="space-y-4">
        <FormField
          control={control}
          name={requiredPath}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor={requiredPath}>
                    {t("form.content.required.label")}
                  </FormLabel>
                  <Switch
                    id={requiredPath}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {renderForm()}
      </CollapsibleContent>
    </Collapsible>
  );
}
