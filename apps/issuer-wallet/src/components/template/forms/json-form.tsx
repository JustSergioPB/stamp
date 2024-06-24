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
import { ContentSchema, TemplateSchema } from "@schemas/template";
import {
  CaseSensitive,
  ChevronsUpDown,
  CircleAlert,
  List,
  ListTree,
  Network,
  Sigma,
  SigmaSquare,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { Control, FieldPath, UseFormWatch } from "react-hook-form";
import { JSONSchemaTypes, JsonSchemaType } from "@stamp/domain";
import { Switch } from "@components/ui/switch";
import ObjectForm from "./object-form";
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
import ContentNode from "./content-node";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentSchema, any>;
  watch: UseFormWatch<ContentSchema>;
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
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");

  const namePath = `${prefix}.name` as FieldPath<ContentSchema>;
  const typePath = `${prefix}.type` as FieldPath<ContentSchema>;
  const requiredPath = `${prefix}.required` as FieldPath<ContentSchema>;

  const name = watch(namePath) as string | undefined;
  const type = watch(typePath) as JsonSchemaType | undefined;

  function renderForm() {
    switch (type) {
      case "object":
        return <ObjectForm control={control} lang={lang} prefix={prefix} />;
      case "array":
        return <ArrayForm control={control} lang={lang} prefix={prefix} />;
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
    <Dialog>
      <div>
        <div className="flex items-center gap-2">
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="rounded-xl">
              {getIcon()}
              {name || t("form.content.property.new")}
            </Button>
          </DialogTrigger>
          <Button size="icon" variant="ghost" onClick={onRemove}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        {type === "object" && (
          <ContentNode
            className="ml-4"
            lang={lang}
            prefix={prefix}
            watch={watch}
            control={control}
            recursive
          />
        )}
        {type === "array" && (
          <ContentNode
            className="ml-4"
            lang={lang}
            prefix={`${prefix}.items`}
            watch={watch}
            control={control}
          />
        )}
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name || t("form.content.property.new")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t("form.base.type.label")}</FormLabel>
                      <SelectTrigger className="basis-2/3">
                        <SelectValue
                          placeholder={t("form.content.array.type")}
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
  );
}
