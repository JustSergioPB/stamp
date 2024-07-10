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
  JsonSchemaType,
  NumberJsonSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from "@stamp/domain";
import { t } from "i18next";
import { CirclePlus, Trash } from "lucide-react";
import {
  ControllerRenderProps,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { iconMap } from "../../_components/content/icon.map";
import TreeAngle from "@components/stamp/tree-angle";
import { cn } from "@lib/utils";

type FactoryProps = {
  jsonSchema: JsonSchema;
  prefix: string;
  lang: string;
  isLast?: boolean;
  className?: string;
};

export function JsonSchemaFormFactory({
  jsonSchema,
  prefix,
  lang,
  isLast,
  className,
}: FactoryProps) {
  const { control } = useFormContext();

  function renderField(field: ControllerRenderProps<FieldValues, string>) {
    switch (jsonSchema.type) {
      case "object":
        return (
          <ObjectJsonSchemaForm
            lang={lang}
            jsonSchema={jsonSchema as ObjectJsonSchema}
            fieldName={prefix}
            isLast={isLast}
          />
        );
      case "array":
        return (
          <ArrayJsonSchemaForm
            lang={lang}
            jsonSchema={jsonSchema as ArrayJsonSchema}
            fieldName={prefix}
            isLast={isLast}
          />
        );
      case "boolean":
        return (
          <BooleanJsonSchemaForm
            jsonSchema={jsonSchema as BooleanJsonSchema}
            field={field}
            isLast={isLast}
          />
        );
      case "string":
        return (
          <StringJsonSchemaForm
            jsonSchema={jsonSchema as StringJsonSchema}
            field={field}
            isLast={isLast}
          />
        );
      case "number":
        return (
          <NumberJsonSchemaForm
            jsonSchema={jsonSchema as NumberJsonSchema}
            field={field}
            isLast={isLast}
          />
        );
      case "integer":
        return (
          <NumberJsonSchemaForm
            jsonSchema={jsonSchema as NumberJsonSchema}
            field={field}
            isLast={isLast}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <FormField
      control={control}
      name={prefix}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormControl>{renderField(field)}</FormControl>
          {fieldState.error?.message && (
            <FormMessage>{t(fieldState.error?.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}

function Pill({
  type,
  title,
  className,
}: {
  type: JsonSchemaType;
  title: string | undefined;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center bg-muted rounded-xl py-2 px-3",
        className
      )}
    >
      {iconMap[type]}
      <FormLabel className="text-sm">{title}</FormLabel>
    </div>
  );
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  jsonSchema: ObjectJsonSchema;
  fieldName: string;
  lang: string;
  isLast?: boolean;
}

export function ObjectJsonSchemaForm({
  jsonSchema,
  fieldName,
  className,
  lang,
  isLast,
}: Props) {
  if (!jsonSchema.properties) return <></>;

  const keys = Object.keys(jsonSchema.properties);
  const lastKey = keys.pop();

  function renderListItem(key: string) {
    if (!jsonSchema.properties || !jsonSchema.properties[key]) return <></>;

    return (
      <li key={key} className="flex items-start first:mt-2">
        <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
        <JsonSchemaFormFactory
          jsonSchema={jsonSchema.properties[key]}
          prefix={`${fieldName}.${key}`}
          lang={lang}
        />
      </li>
    );
  }

  function getLast() {
    if (!lastKey || !jsonSchema.properties?.[lastKey]) return <></>;

    return (
      <JsonSchemaFormFactory
        jsonSchema={jsonSchema.properties[lastKey]}
        prefix={`${fieldName}.${lastKey}`}
        lang={lang}
        isLast
      />
    );
  }

  return (
    <div className={className}>
      {isLast ? (
        <TreeAngle>
          <Pill type="object" title={jsonSchema.title} />
        </TreeAngle>
      ) : (
        <Pill type="object" title={jsonSchema.title} />
      )}
      <div className={cn("flex", isLast ? "ml-8" : "ml-4")}>
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full space-y-2 mb-2 grow shrink-0 basis-auto">
          {keys.map((key) => renderListItem(key))}
        </ul>
      </div>
      {getLast()}
    </div>
  );
}

interface ArrayProps extends React.HTMLAttributes<HTMLDivElement> {
  jsonSchema: ArrayJsonSchema;
  fieldName: string;
  lang: string;
  isLast?: boolean;
}

export function ArrayJsonSchemaForm({
  jsonSchema,
  fieldName,
  lang,
  className,
  isLast,
}: ArrayProps) {
  const { t } = useTranslation(lang, "actions");
  const { control } = useFormContext();

  const { append, fields, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  function renderListItem(field: Record<"id", string>, index: number) {
    const schema = jsonSchema.items as JsonSchema;

    return (
      <li className="flex items-start first:mt-2" key={`${field}.${index}`}>
        <span className="border-b-2 border-b-neutral-300 w-4 inline-block mt-5"></span>
        <JsonSchemaFormFactory
          jsonSchema={{ ...schema, title: `${jsonSchema.title} ${index + 1}` }}
          prefix={`${fieldName}.${index}`}
          lang={lang}
          className="grow shrink-0 basis-auto"
        />
        <Button
          className="ml-2"
          variant="ghost"
          size="icon"
          onClick={() => remove(index)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </li>
    );
  }

  return (
    <div className={className}>
      {isLast ? (
        <TreeAngle className="ml-4">
          <Pill type="array" title={jsonSchema.title} />
        </TreeAngle>
      ) : (
        <Pill type="array" title={jsonSchema.title} />
      )}
      <div className={cn("flex", isLast ? "ml-12" : "ml-4")}>
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="space-y-2 mb-2 grow shrink-0 basis-auto">
          {fields.map((field, index) => renderListItem(field, index))}
        </ul>
      </div>
      <TreeAngle className={isLast ? "ml-12" : "ml-4"}>
        <Button size="sm" type="button" className="rounded-xl" onClick={append}>
          <CirclePlus className="h-4 w-4 mr-2" />
          {t("add")}
        </Button>
      </TreeAngle>
    </div>
  );
}

export function BooleanJsonSchemaForm({
  jsonSchema,
  field,
  isLast,
}: {
  jsonSchema: BooleanJsonSchema;
  field: ControllerRenderProps<FieldValues, string>;
  isLast?: boolean;
}) {
  function renderItem() {
    return (
      <div className="inline-flex items-center bg-muted rounded-xl py-2 px-3">
        <FormLabel htmlFor={jsonSchema.title}>{jsonSchema.title}</FormLabel>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          id={jsonSchema.title}
        />
      </div>
    );
  }

  return isLast ? (
    <TreeAngle className="ml-4">{renderItem()}</TreeAngle>
  ) : (
    renderItem()
  );
}

export function StringJsonSchemaForm({
  jsonSchema,
  field,
  isLast,
}: {
  jsonSchema: StringJsonSchema;
  field: ControllerRenderProps<FieldValues, string>;
  isLast?: boolean;
}) {
  function renderItem() {
    return (
      <div className="flex items-center gap-2">
        <Pill
          className="grow shrink-0 basis-auto"
          type="string"
          title={jsonSchema.title}
        />
        <Input
          placeholder={jsonSchema.title}
          pattern={jsonSchema.pattern}
          type={jsonSchema.format}
          minLength={jsonSchema.minLength}
          maxLength={jsonSchema.maxLength}
          {...field}
        />
      </div>
    );
  }

  return isLast ? (
    <TreeAngle className="ml-4">{renderItem()}</TreeAngle>
  ) : (
    renderItem()
  );
}

export function NumberJsonSchemaForm({
  jsonSchema,
  field,
  isLast,
}: {
  jsonSchema: NumberJsonSchema;
  field: ControllerRenderProps<FieldValues, string>;
  isLast?: boolean;
}) {
  function renderItem() {
    return (
      <div className="flex items-center gap-2">
        <Pill
          className="grow shrink-0 basis-auto"
          type={jsonSchema.type}
          title={jsonSchema.title}
        />
        <Input
          placeholder={jsonSchema.title}
          type="number"
          step={jsonSchema.multipleOf}
          min={
            jsonSchema.minimum && jsonSchema.exclusiveMinimum
              ? jsonSchema.minimum - 1
              : jsonSchema.minimum
          }
          max={
            jsonSchema.maximum && jsonSchema.exclusiveMaximum
              ? jsonSchema.maximum - 1
              : jsonSchema.maximum
          }
          {...field}
        />
      </div>
    );
  }
  return isLast ? (
    <TreeAngle className="ml-4">{renderItem()}</TreeAngle>
  ) : (
    renderItem()
  );
}
