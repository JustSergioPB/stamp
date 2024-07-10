import {
  ArrayJsonSchema,
  JsonSchema,
  JsonSchemaType,
  NumberJsonSchema,
  ObjectJsonSchema,
  StringJsonSchema,
} from "@stamp/domain";
import { z } from "zod";

export interface ZodMapper<T> {
  // eslint-disable-next-line no-unused-vars
  map(jsonSchema: JsonSchema, required: boolean): z.ZodType<T>;
}

export class ZodMapperFactory {
  static create(type: JsonSchemaType): ZodMapper<any> {
    switch (type) {
      case "string":
        return new StringZodMapper();
      case "number":
        return new NumberZodMapper();
      case "boolean":
        return new BooleanZodMapper();
      case "object":
        return new ObjectZodMapper();
      case "array":
        return new ArrayZodMapper();
      default:
        throw new Error("Unsupported schema type");
    }
  }
}

export class StringZodMapper implements ZodMapper<string> {
  map(jsonSchema: StringJsonSchema, required: boolean): z.ZodType<string> {
    const base = z.string();

    if (!required) {
      base.optional();
    }

    if (jsonSchema.minLength) {
      base.min(jsonSchema.minLength ?? 1, "form.validation.minLength");
    }

    if (jsonSchema.maxLength) {
      base.max(jsonSchema.maxLength, "form.validation.maxLength");
    }

    if (jsonSchema.pattern) {
      base.regex(new RegExp(jsonSchema.pattern), "form.validation.pattern");
    }

    switch (jsonSchema.format) {
      case "date":
        base.date("form.validation.date");
        break;
      case "date-time":
        base.datetime("form.validation.dateTime");
        break;
      case "time":
        base.time("form.validation.time");
        break;
    }

    return base;
  }
}

export class NumberZodMapper implements ZodMapper<number> {
  map(jsonSchema: NumberJsonSchema, required: boolean): z.ZodType<number> {
    const base = z.coerce.number();

    if (!required) {
      base.optional();
    }

    if (jsonSchema.minimum) {
      base.min(jsonSchema.minimum, "form.validation.minimum");
    }

    if (jsonSchema.maximum) {
      base.max(jsonSchema.maximum, "form.validation.maximum");
    }

    if (jsonSchema.exclusiveMinimum) {
      base.min(jsonSchema.exclusiveMinimum, "form.validation.exclusiveMinimum");
    }

    if (jsonSchema.exclusiveMaximum) {
      base.max(jsonSchema.exclusiveMaximum, "form.validation.exclusiveMaximum");
    }

    if (jsonSchema.multipleOf) {
      base.step(jsonSchema.multipleOf, "form.validation.multipleOf");
    }

    return base;
  }
}

export class BooleanZodMapper implements ZodMapper<boolean> {
  map(jsonSchema: JsonSchema, required: boolean): z.ZodType<boolean> {
    let base = z.boolean();

    if (!required) {
      base.optional();
    }

    return base;
  }
}

export class ObjectZodMapper implements ZodMapper<Object> {
  map(jsonSchema: ObjectJsonSchema, required: boolean): z.ZodType<Object> {
    let contentBase: { [x: string]: z.ZodType<any> } = {};

    if (jsonSchema.properties) {
      const keys = Object.keys(jsonSchema.properties);
      keys.forEach((key) => {
        if (!jsonSchema.properties?.[key]) return;
        const mapper = ZodMapperFactory.create(jsonSchema.properties[key].type);
        const mapepd = mapper.map(jsonSchema.properties[key], required);
        contentBase[key] = mapepd;
      });
    }

    let base = z.object(contentBase);

    if (!required) {
      base.optional();
    }

    return base;
  }
}

export class ArrayZodMapper implements ZodMapper<Array<any>> {
  map(jsonSchema: ArrayJsonSchema, required: boolean): z.ZodType<any[]> {
    let contentBase: z.ZodType<any> = z.any();

    if (jsonSchema.items && typeof jsonSchema.items === "object") {
      const items = jsonSchema.items as JsonSchema;
      const mapper = ZodMapperFactory.create(items.type);
      contentBase = mapper.map(items, required);
    }

    const base: z.ZodArray<any> = z.array(contentBase);

    if (!required) {
      base.optional();
    }

    if (jsonSchema.minItems) {
      base.min(jsonSchema.minItems, "form.validation.minItems");
    }

    if (jsonSchema.maxItems) {
      base.max(jsonSchema.maxItems, "form.validation.maxItems");
    }

    return base;
  }
}
