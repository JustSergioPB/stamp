"use client";

import { ContentSchema, defaultJsonSchema } from "@schemas/template";
import {
  Control,
  FieldPath,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import JsonForm from "./json-form";
import { useTranslation } from "@i18n/client";
import TreeAngle from "@components/stamp/tree-angle";
import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@lib/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentSchema, any>;
  watch: UseFormWatch<ContentSchema>;
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
    name: prefix as "credentialSubject" | `credentialSubject.${number}`,
  });

  return (
    <div className={cn("grow shrink-0 basis-auto", className)}>
      <div className="flex">
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full space-y-2">
          {fields.map((field, index) => (
            <li className="flex items-start" key={field.id}>
              <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
              <JsonForm
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
          onClick={() => append(defaultJsonSchema)}
        >
          <CirclePlus className="h-4 w-4 mr-2" />
          {t("form.actions.addField")}
        </Button>
      </TreeAngle>
    </div>
  );
}
