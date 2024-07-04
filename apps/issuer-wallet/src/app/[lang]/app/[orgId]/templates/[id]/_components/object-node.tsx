"use client";
import { Control, UseFormWatch, useFieldArray } from "react-hook-form";
import JsonSchemaForm from "./json-schema-form";
import { useTranslation } from "@i18n/client";
import TreeAngle from "@components/stamp/tree-angle";
import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@lib/utils";
import {
  ContentZod,
  defaultJsonSchemaZod,
} from "@features/credentials/template/models";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentZod, any>;
  watch: UseFormWatch<ContentZod>;
  lang: string;
  prefix: string;
  recursive?: boolean;
}

export default function ObjectNode({
  control,
  lang,
  prefix,
  watch,
  className,
}: Props) {
  const { t } = useTranslation(lang, "template");

  const { fields, append, remove } = useFieldArray({
    control,
    name: prefix as
      | "credentialSubject.properties"
      | `credentialSubject.properties.${number}`,
  });

  return (
    <div className={cn("grow shrink-0 basis-auto", className)}>
      <div className="flex">
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full space-y-2">
          {fields.map((field, index) => (
            <li className="flex items-start first:mt-2" key={field.id}>
              <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
              <JsonSchemaForm
                lang={lang}
                watch={watch}
                className="grow shrink-0 basis-auto"
                prefix={`${prefix}.${index}`}
                onRemove={() => remove(index)}
              />
            </li>
          ))}
        </ul>
      </div>
      <TreeAngle>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={() => append(defaultJsonSchemaZod)}
        >
          <CirclePlus className="h-4 w-4 mr-2" />
          {t("form.actions.addField")}
        </Button>
      </TreeAngle>
    </div>
  );
}
