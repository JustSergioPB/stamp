import { JsonSchema } from "@stamp/domain";
import { JsonSchemaZod } from "../models";

export class JsonSchemaMapper {
  static toZod(jsonSchema: JsonSchema): JsonSchemaZod {
    const { properties, patternProperties, required, items, ...rest } =
      jsonSchema;

    let mapped: JsonSchemaZod = {
      ...rest,
      //TODO: Temp patch since we aren't supporting arrays
      items: { type: (items as JsonSchema)?.type ?? "string", title: "$" },
    };

    if (items) {
      mapped = {
        ...mapped,
        items: this.toZod(items as JsonSchema),
      };
    }

    if (properties) {
      const mappedProps: JsonSchema[] = [];
      const keys = Object.keys(properties);
      keys.forEach((key) => {
        mappedProps.push(this.toZod(properties[key]!));
      });
      mapped = {
        ...mapped,
        properties: mappedProps,
      };

      if (required) {
        mapped = {
          ...mapped,
          required: required
            .map((str: string) => properties[str]?.title)
            .filter((str) => str),
        };
      }
    }

    if (patternProperties) {
      const mappedProps: JsonSchema[] = [];
      const keys = Object.keys(patternProperties);
      keys.forEach((key) => {
        mappedProps.push(this.toZod(patternProperties[key]!));
      });
      mapped = {
        ...mapped,
        patternProperties: mappedProps,
      };
    }

    return mapped;
  }

  static toDomain(jsonSchemaZod: JsonSchemaZod): {
    name: string;
    schema: JsonSchema;
  } {
    const { properties, patternProperties, required, items, ...rest } =
      jsonSchemaZod;

    let mapped: JsonSchema = rest;

    mapped = {
      ...mapped,
      items: items ? this.toDomain(items).schema : undefined,
    };

    if (properties) {
      let mappedProps: { [key: string]: JsonSchema } = {};

      properties.forEach((prop: JsonSchemaZod) => {
        const { name, schema } = this.toDomain(prop);
        mappedProps[name] = schema;
      });

      mapped = {
        ...mapped,
        properties: mappedProps,
      };

      if (required) {
        mapped = {
          ...mapped,
          required: required.map((str: string) =>
            this.toCamelCase(this.removeAccents(str))
          ),
        };
      }
    }

    if (patternProperties) {
      let mappedProps: { [key: string]: JsonSchema } = {};

      properties.forEach((prop: JsonSchemaZod) => {
        const { name, schema } = this.toDomain(prop);
        mappedProps[name] = schema;
      });

      mapped = {
        ...mapped,
        patternProperties: mappedProps,
      };
    }

    return {
      name: this.toCamelCase(this.removeAccents(jsonSchemaZod.title)),
      schema: mapped,
    };
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
