"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import JsonSchemaForm from "./json-schema-form";
import { useTranslation } from "@i18n/client";
import TreeAngle from "@components/stamp/tree-angle";
import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@lib/utils";
import { defaultJsonSchemaZod } from "@features/credentials/json-schema/models";
import { replaceLastOccurrence } from "@lib/typescript";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  prefix: string;
}

export default function ObjectForm({ lang, prefix, className }: Props) {
  const { t } = useTranslation(lang, "template");
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: prefix,
  });

  return (
    <div className={cn("grow shrink-0 basis-auto", className)}>
      <div className="flex">
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full space-y-2 mb-2">
          {fields.map((field, index) => (
            <li className="flex items-start first:mt-2" key={field.id}>
              <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
              <JsonSchemaForm
                lang={lang}
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
          size="sm"
          type="button"
          className="rounded-xl"
          onClick={() => append(defaultJsonSchemaZod)}
        >
          <CirclePlus className="h-4 w-4 mr-2" />
          {t("form.actions.addField")}
        </Button>
      </TreeAngle>
    </div>
  );
}
