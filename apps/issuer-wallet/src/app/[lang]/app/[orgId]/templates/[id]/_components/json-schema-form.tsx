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
  Binary,
  CaseSensitive,
  CircleAlert,
  CircleSlash2,
  List,
  Network,
  Sigma,
  SigmaSquare,
  Trash,
} from "lucide-react";
import {
  Control,
  FieldPath,
  UseFormWatch,
  useController,
} from "react-hook-form";
import { JSONSchemaTypes, JsonSchemaType } from "@stamp/domain";
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
import { ContentZod } from "@features/credentials/template/models";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentZod, any>;
  watch: UseFormWatch<ContentZod>;
  lang: string;
  prefix: string;
  onRemove: () => void;
}

export default function JsonSchemaForm({
  control,
  lang,
  onRemove,
  prefix,
  watch,
  className,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");

  const titlePath = `${prefix}.title` as FieldPath<ContentZod>;
  const typePath = `${prefix}.type` as FieldPath<ContentZod>;
  const subtypePath = `${prefix}.items.type` as FieldPath<ContentZod>;

  const title = watch(titlePath) as string | undefined;
  const type = watch(typePath) as JsonSchemaType | undefined;
  const subtype = watch(subtypePath) as JsonSchemaType | undefined;

  const {
    fieldState: { error: titleError },
  } = useController({
    control,
    name: titlePath,
  });

  const {
    fieldState: { error: typeError },
  } = useController({
    control,
    name: typePath,
  });

  const {
    fieldState: { error: subtypeError },
  } = useController({
    control,
    name: subtypePath,
  });

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
      case "null":
        return <CircleSlash2 className="h-4 w-4 mr-2" />;
      case "boolean":
        return <Binary className="h-4 w-4 mr-2" />;
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
            <Button
              variant={
                titleError || typeError || (type === "array" && subtypeError)
                  ? "destructive"
                  : "secondary"
              }
              size="sm"
              className="rounded-xl"
            >
              {getIcon()}
              {title || t("form.content.property.new")}
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col">
            <DialogHeader className="p-1">
              <DialogTitle>
                {title || t("form.content.property.new")}
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[70vh] space-y-2 overflow-y-auto p-1">
              <FormField
                control={control}
                name={titlePath}
                render={({ field, fieldState }) => (
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
                    {fieldState.error?.message && (
                      <FormMessage>{t(fieldState.error.message)}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={typePath}
                render={({ field, fieldState }) => (
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
                    {fieldState.error?.message && (
                      <FormMessage>{t(fieldState.error.message)}</FormMessage>
                    )}
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
      {type === "object" && (
        <ObjectNode
          className="ml-4"
          lang={lang}
          prefix={`${prefix}.properties`}
          watch={watch}
          control={control}
        />
      )}
      {subtype === "object" && (
        <ObjectNode
          className="ml-4"
          lang={lang}
          prefix={`${prefix}.items.properties`}
          watch={watch}
          control={control}
        />
      )}
    </div>
  );
}
