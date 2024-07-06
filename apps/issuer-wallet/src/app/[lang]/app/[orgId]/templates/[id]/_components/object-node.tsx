"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import JsonSchemaForm from "./json-schema-form";
import { useTranslation } from "@i18n/client";
import TreeAngle from "@components/stamp/tree-angle";
import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@lib/utils";
import { defaultJsonSchemaZod } from "@features/credentials/json-schema/models";
import { replaceLastOccurrence } from "@lib/string";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  prefix: string;
}

export default function ObjectNode({ lang, prefix, className }: Props) {
  const { t } = useTranslation(lang, "template");
  const { control, setValue, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: prefix,
  });

  const requiredPath = `${replaceLastOccurrence(prefix, "properties", "required")}`;
  const required = getValues(requiredPath) as string[] | undefined;

  //TODO: This should be in a utils function in json schema
  function isRequired(prefix: string): boolean {
    const title = getValues(`${prefix}.title`) as string | undefined;

    if (!required) {
      return false;
    }

    return required.some((str) => str === title);
  }

  function handleRequiredChange(value: string, checked: boolean) {
    if (!required) {
      setValue(requiredPath, [value]);
      return;
    }

    if (checked) {
      setValue(requiredPath, [...required, value]);
      return;
    }

    setValue(
      requiredPath,
      required.filter((item) => item !== value)
    );
  }

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
                className="grow shrink-0 basis-auto"
                prefix={`${prefix}.${index}`}
                requiredChecked={isRequired(`${prefix}.${index}`)}
                onRemove={() => remove(index)}
                onRequiredChange={handleRequiredChange}
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
