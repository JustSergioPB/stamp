"use client";

import { Button } from "@components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { TemplateDetailedView } from "@features/credentials/template/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { Dialog } from "@radix-ui/react-dialog";
import {
  ArrayJsonSchema,
  JsonSchema,
  NumberJsonSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from "@stamp/domain";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ObjectJsonSchemaForm from "./object-json-schema-form";
import { ContentUtils } from "@features/credentials/template/utils/content.utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  template: TemplateDetailedView;
  lang: string;
  disabled?: boolean;
}

export default function AddButton({ lang, disabled, template }: Props) {
  const { t } = useTranslation(lang, "credential");
  const { t: tAction } = useTranslation(lang, "actions");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const withOutId = ContentUtils.removeIdFromSchema(
    template.content?.credentialSubject as ObjectJsonSchema
  );

  const form = useForm({
    resolver: zodResolver(getZodObject(withOutId, true)),
  });

  function handleSubmit() {
    const data = form.getValues();
    console.log(data);
  }

  function getZodString(schema: StringJsonSchema, required: boolean) {
    const base = z.string();

    if (!required) {
      base.optional();
    }

    if (schema.minLength) {
      base.min(schema.minLength ?? 1, t("form.validation.minLength"));
    }

    if (schema.maxLength) {
      base.max(schema.maxLength, t("form.validation.maxLength"));
    }

    if (schema.pattern) {
      base.regex(new RegExp(schema.pattern), t("form.validation.pattern"));
    }

    if (schema.format) {
      switch (schema.format) {
        case "date":
          base.date(t("form.validation.date"));
          break;
        case "date-time":
          base.datetime(t("form.validation.dateTime"));
          break;
        case "time":
          base.time(t("form.validation.time"));
          break;
      }
    }

    return base;
  }

  function getZodNumber(schema: NumberJsonSchema, required: boolean) {
    const base = z.coerce.number();

    if (!required) {
      base.optional();
    }

    if (schema.minimum) {
      base.min(schema.minimum, t("form.validation.minimum"));
    }

    if (schema.maximum) {
      base.max(schema.maximum, t("form.validation.maximum"));
    }

    if (schema.exclusiveMinimum) {
      base.min(schema.exclusiveMinimum, t("form.validation.exclusiveMinimum"));
    }

    if (schema.exclusiveMaximum) {
      base.max(schema.exclusiveMaximum, t("form.validation.exclusiveMaximum"));
    }

    if (schema.multipleOf) {
      base.step(schema.multipleOf, t("form.validation.multipleOf"));
    }

    return base;
  }

  function getZodObject(
    schema: ObjectJsonSchema = { type: "object" },
    required: boolean
  ) {
    const content: {
      [x: string]:
        | z.ZodString
        | z.ZodNumber
        | z.ZodObject<any>
        | z.ZodArray<any>
        | z.ZodBoolean
        | z.ZodAny;
    } = {};

    if (schema.properties) {
      const keys = Object.keys(schema.properties);
      keys.forEach((key) => {
        let mapped:
          | z.ZodString
          | z.ZodNumber
          | z.ZodObject<any>
          | z.ZodArray<any>
          | z.ZodBoolean
          | z.ZodAny;
        const property = schema.properties?.[key];

        if (!property) {
          return;
        }

        switch (property.type) {
          case "string":
            mapped = getZodString(
              property as StringJsonSchema,
              schema.required?.includes(key) ?? false
            );
            break;
          case "number":
            mapped = getZodNumber(
              property as NumberJsonSchema,
              schema.required?.includes(key) ?? false
            );
            break;
          case "object":
            mapped = getZodObject(
              property as ObjectJsonSchema,
              schema.required?.includes(key) ?? false
            );
            break;
          case "array":
            mapped = getZodArray(
              property as ArrayJsonSchema,
              schema.required?.includes(key) ?? false
            );
            break;
          case "boolean":
            mapped = getZodBoolean(schema.required?.includes(key) ?? false);
            break;
          default:
            mapped = z.any();
            break;
        }

        content[key] = mapped;
      });
    }

    const base = z.object(content);

    if (!required) {
      base.optional();
    }

    return base;
  }

  function getZodArray(schema: ArrayJsonSchema, required: boolean) {
    let contentBase:
      | z.ZodString
      | z.ZodNumber
      | z.ZodObject<any>
      | z.ZodArray<any>
      | z.ZodBoolean
      | z.ZodAny = z.any();

    if (schema.items) {
      switch ((schema.items as JsonSchema).type) {
        case "string":
          contentBase = getZodString(
            schema.items as StringJsonSchema,
            required
          );
          break;
        case "number":
          contentBase = getZodNumber(
            schema.items as NumberJsonSchema,
            required
          );
          break;
        case "object":
          contentBase = getZodObject(
            schema.items as ObjectJsonSchema,
            required
          );
          break;
        case "array":
          contentBase = getZodArray(schema.items as ArrayJsonSchema, required);
          break;
        case "boolean":
          contentBase = getZodBoolean(required);
          break;
        default:
          contentBase = z.any();
          break;
      }
    }

    const base: z.ZodArray<any> = z.array(contentBase);

    if (!required) {
      base.optional();
    }

    if (schema.minItems) {
      base.min(schema.minItems, t("form.validation.minItems"));
    }

    if (schema.maxItems) {
      base.max(schema.maxItems, t("form.validation.maxItems"));
    }

    return base;
  }

  function getZodBoolean(required: boolean) {
    let base = z.boolean();

    if (!required) {
      base.optional();
    }

    return base;
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={disabled} onClick={() => setOpen(true)}>
          <CirclePlus className="h-4 w-4 mr-2" />
          {t("actions.create")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{template.base?.name ?? t("verifiable")}</DialogTitle>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit, () => {
              console.log("error");
            })}
          >
            <ObjectJsonSchemaForm
              lang={lang}
              jsonSchema={withOutId}
              fieldName="credentialSubject"
              className="max-h-[70vh] overflow-y-auto overflow-x-hidden"
            />
            <DialogFooter>
              <DialogFooter>
                <Button
                  variant="ghost"
                  type="reset"
                  className="max-h-[70vh] overflow-y-auto px-1"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  {tAction("cancel")}
                </Button>
                <Button type="submit" disabled={loading}>
                  {tAction("save")}
                </Button>
              </DialogFooter>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
