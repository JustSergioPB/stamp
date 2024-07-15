import { ArrayJsonSchema, JsonSchema, ObjectJsonSchema } from "@stamp/domain";
import {
  ArrayJsonSchemaZod,
  JsonSchemaZod,
  ObjectJsonSchemaZod,
} from "../models";

export class JsonSchemaMapper {
  public static toDomain(jsonSchema: JsonSchemaZod): {
    schema: JsonSchema;
    name: string;
    required: boolean;
  } {
    const name = this.toPropertyKey(jsonSchema.title ?? "");
    let schema: JsonSchema = jsonSchema;

    switch (jsonSchema.type) {
      case "object":
        schema = this.objectToDomain(jsonSchema as ObjectJsonSchemaZod);
        break;
      case "array":
        schema = this.arrayToDomain(jsonSchema as ArrayJsonSchemaZod);
        break;
      default:
        schema = jsonSchema;
    }

    return { schema, name, required: jsonSchema.required ?? false };
  }

  private static objectToDomain(
    jsonSchema: ObjectJsonSchemaZod
  ): ObjectJsonSchema {
    const {
      properties,
      patternProperties,
      additionalProperties,
      unevaluatedProperties,
      ...rest
    } = jsonSchema;
    const base = rest as ObjectJsonSchema;

    if (properties) {
      let mapped: { [key: string]: JsonSchema } = {};
      base.required = [];
      properties.forEach((prop) => {
        const { schema, name, required } = this.toDomain(prop);
        mapped[name] = schema;

        if (required) {
          base.required?.push(name);
        }
      });
      base.properties = mapped;
    }

    if (patternProperties) {
      let mapped: { [key: string]: JsonSchema } = {};
      patternProperties.forEach((prop) => {
        const { schema, name } = this.toDomain(prop);
        mapped[name] = schema;
      });
      base.patternProperties = mapped;
    }

    if (additionalProperties) {
      if (typeof additionalProperties === "object") {
        const { schema } = this.toDomain(additionalProperties);
        base.additionalProperties = schema;
      } else {
        base.additionalProperties = additionalProperties;
      }
    }

    if (unevaluatedProperties) {
      if (typeof unevaluatedProperties === "object") {
        const { schema } = this.toDomain(unevaluatedProperties);
        base.unevaluatedProperties = schema;
      } else {
        base.unevaluatedProperties = unevaluatedProperties;
      }
    }

    return base;
  }

  private static arrayToDomain(
    jsonSchema: ArrayJsonSchemaZod
  ): ArrayJsonSchema {
    const { items, prefixItems, unevaluatedItems, contains, ...rest } =
      jsonSchema;
    const base = rest as ArrayJsonSchema;

    if (items) {
      const { schema } = this.toDomain(items);
      base.items = schema;
    }

    if (prefixItems) {
      let mapped: JsonSchema[] = [];
      prefixItems.forEach((item) => {
        const { schema } = this.toDomain(item);
        mapped.push(schema);
      });
      base.prefixItems = mapped;
    }

    if (unevaluatedItems) {
      if (typeof unevaluatedItems === "object") {
        const { schema } = this.toDomain(unevaluatedItems);
        base.unevaluatedItems = schema;
      } else {
        base.unevaluatedItems = unevaluatedItems;
      }
    }

    if (contains) {
      if (typeof contains === "object") {
        const { schema } = this.toDomain(contains);
        base.contains = schema;
      } else {
        base.contains = contains;
      }
    }

    return base;
  }

  static toPropertyKey(str: string): string {
    const withoutAccents = this.removeAccents(str);
    const lowerCase = withoutAccents.toLowerCase();
    return this.toCamelCase(lowerCase);
  }

  private static removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  private static toCamelCase(str: string): string {
    return str
      .replace(/([-_ \s]+(.)?)/g, (match, separator, chr) =>
        chr ? chr.toUpperCase() : ""
      )
      .replace(/^(.)/, (match) => match.toLowerCase());
  }
}
