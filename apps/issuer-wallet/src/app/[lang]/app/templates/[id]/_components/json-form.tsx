"use client";

import { Button } from "@components/ui/button";
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
import {
  CaseSensitive,
  CircleAlert,
  List,
  Network,
  Sigma,
  SigmaSquare,
  Trash,
} from "lucide-react";
import { Control, FieldPath, UseFormWatch } from "react-hook-form";
import { JSONSchemaTypes, JsonSchemaType } from "@stamp/domain";
import { Switch } from "@components/ui/switch";
import ArrayForm from "./array-form";
import NumberForm from "./number-form";
import StringForm from "./string-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import ObjectNode from "./object-node";
import { ContentZod } from "@features/template/models";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentZod, any>;
  watch: UseFormWatch<ContentZod>;
  lang: string;
  prefix: string;
  onRemove: () => void;
}

export default function JsonForm({
  control,
  lang,
  onRemove,
  prefix,
  watch,
  className,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");

  const namePath = `${prefix}.name` as FieldPath<ContentZod>;
  const typePath = `${prefix}.type` as FieldPath<ContentZod>;
  const requiredPath = `${prefix}.required` as FieldPath<ContentZod>;
  const subtypePath = `${prefix}.subtype` as FieldPath<ContentZod>;

  const name = watch(namePath) as string | undefined;
  const type = watch(typePath) as JsonSchemaType | undefined;
  const subtype = watch(subtypePath) as JsonSchemaType | undefined;

  function renderForm() {
    switch (type) {
      case "array":
        return (
          <ArrayForm
            control={control}
            lang={lang}
            prefix={prefix}
            watch={watch}
          />
        );
      case "number":
        return <NumberForm control={control} lang={lang} prefix={prefix} />;
      case "integer":
        return <NumberForm control={control} lang={lang} prefix={prefix} />;
      case "string":
        return <StringForm control={control} lang={lang} prefix={prefix} />;
      default:
        return <></>;
    }
  }

  function getIcon() {
    switch (type) {
      case "object":
        return <Network className="h-4 w-4 mr-2" />;
      case "array":
        return <List className="h-4 w-4 mr-2" />;
      case "number":
        return <Sigma className="h-4 w-4 mr-2" />;
      case "integer":
        return <SigmaSquare className="h-4 w-4 mr-2" />;
      case "string":
        return <CaseSensitive className="h-4 w-4 mr-2" />;
      default:
        return <CircleAlert className="h-4 w-4 mr-2" />;
    }
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="rounded-xl">
              {getIcon()}
              {name || t("form.content.property.new")}
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col">
            <DialogHeader className="p-1">
              <DialogTitle>
                {name || t("form.content.property.new")}
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[70vh] space-y-2 overflow-y-auto p-1">
              <FormField
                control={control}
                name={namePath}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-between">
                        <FormLabel>{t("form.base.name.label")}</FormLabel>
                        <Input
                          className="basis-2/3"
                          placeholder={t("form.base.name.placeholder")}
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
                name={typePath}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <div className="flex items-center justify-between">
                          <FormLabel>{t("form.content.type.label")}</FormLabel>
                          <SelectTrigger className="basis-2/3">
                            <SelectValue
                              placeholder={t("form.content.type.label")}
                            />
                          </SelectTrigger>
                        </div>
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" size="sm">
                  {tAction("save")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button size="icon" variant="ghost" onClick={onRemove}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      {(type === "object" || subtype === "object") && (
        <ObjectNode
          className="ml-4"
          lang={lang}
          prefix={`${prefix}.properties`}
          watch={watch}
          control={control}
        />
      )}
    </div>
  );
}
