import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useTranslation } from "@i18n/client";
import {
  ArrayJsonSchema,
  BooleanJsonSchema,
  JsonSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from "@stamp/domain";
import { t } from "i18next";
import { CirclePlus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  jsonSchema: ObjectJsonSchema;
  fieldName: string;
  lang: string;
}

export default function ObjectJsonSchemaForm({
  jsonSchema,
  fieldName,
  lang,
}: Props) {
  const keys = Object.keys(jsonSchema.properties ?? {});
  const { control } = useFormContext();

  function renderForm(key: string) {
    const property = jsonSchema.properties?.[key];

    if (!property) {
      return <></>;
    }

    switch (property.type) {
      case "object":
        return (
          <ObjectJsonSchemaForm
            lang={lang}
            jsonSchema={property as ObjectJsonSchema}
            fieldName={`${fieldName}.${key}`}
          />
        );
      case "array":
        return (
          <ArrayJsonSchemaForm
            lang={lang}
            jsonSchema={property as ArrayJsonSchema}
            fieldName={`${fieldName}.${key}`}
          />
        );
      case "boolean":
        return (
          <BooleanJsonSchemaForm
            jsonSchema={property as BooleanJsonSchema}
            fieldName={`${fieldName}.${key}`}
          />
        );
      case "string":
        return (
          <StringJsonSchemaForm
            jsonSchema={property as StringJsonSchema}
            fieldName={`${fieldName}.${key}`}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ fieldState }) => (
        <FormItem>
          {jsonSchema.title !== "credentialSubject" && (
            <FormLabel className="text-lg font-semibold">
              {jsonSchema.title}
            </FormLabel>
          )}
          <FormControl>
            <ul className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
              {keys.map((key) => (
                <li key={key}>{renderForm(key)}</li>
              ))}
            </ul>
          </FormControl>
          {fieldState.error?.message && (
            <FormMessage>{t(fieldState.error?.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}

export function ArrayJsonSchemaForm({
  jsonSchema,
  fieldName,
  lang,
}: {
  jsonSchema: ArrayJsonSchema;
  fieldName: string;
  lang: string;
}) {
  const { t } = useTranslation(lang, "actions");
  const { control } = useFormContext();

  const { append, fields, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  function renderForm(index: number) {
    switch ((jsonSchema.items as JsonSchema)?.type) {
      case "object":
        return (
          <ObjectJsonSchemaForm
            lang={lang}
            jsonSchema={jsonSchema.items as ObjectJsonSchema}
            fieldName={`${fieldName}.${index}`}
          />
        );
      case "array":
        return (
          <ArrayJsonSchemaForm
            lang={lang}
            jsonSchema={jsonSchema.items as ArrayJsonSchema}
            fieldName={`${fieldName}.${index}`}
          />
        );
      case "boolean":
        return (
          <BooleanJsonSchemaForm
            jsonSchema={jsonSchema.items as BooleanJsonSchema}
            fieldName={`${fieldName}.${index}`}
          />
        );
      case "string":
        return (
          <StringJsonSchemaForm
            jsonSchema={jsonSchema.items as StringJsonSchema}
            fieldName={`${fieldName}.${index}`}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ fieldState }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="text-lg font-semibold">
              {jsonSchema.title}
            </FormLabel>
            <Button size="sm">
              <CirclePlus className="h-4 w-4 mr-2" />
              {t("add")}
            </Button>
          </div>
          <FormControl>
            <ul className="max-h-[70vh] space-y-4 overflow-y-auto p-1">
              {fields.map((field, index) => (
                <li key={`${field}.${index}`}>{renderForm(index)}</li>
              ))}
            </ul>
          </FormControl>
          {fieldState.error?.message && (
            <FormMessage>{t(fieldState.error?.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}

export function BooleanJsonSchemaForm({
  jsonSchema,
  fieldName,
}: {
  jsonSchema: BooleanJsonSchema;
  fieldName: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center gap-1">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id={fieldName}
              />
              <FormLabel htmlFor={fieldName}>{jsonSchema.title}</FormLabel>
            </div>
          </FormControl>
          {fieldState.error?.message && (
            <FormMessage>{t(fieldState.error?.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}

export function StringJsonSchemaForm({
  jsonSchema,
  fieldName,
}: {
  jsonSchema: StringJsonSchema;
  fieldName: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{jsonSchema.title}</FormLabel>
          <FormControl>
            <Input placeholder={jsonSchema.title} {...field} />
          </FormControl>
          {fieldState.error?.message && (
            <FormMessage>{t(fieldState.error?.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
