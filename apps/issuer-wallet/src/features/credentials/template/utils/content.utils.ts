import { ObjectJsonSchema, StringJsonSchema } from "@stamp/domain";
import { BaseZod, ContentZod } from "../models";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils";
import { ContentDetailedView } from "../models/views/content-detailed.view";
import { deepEqual } from "@lib/typescript";

export class ContentUtils {
  static toDomain(content: ContentZod, base?: BaseZod): ObjectJsonSchema {
    const jsonSchema = JsonSchemaMapper.toDomain(content.credentialSubject)
      .schema as ObjectJsonSchema;

    jsonSchema.$schema = "https://json-schema.org/draft/2020-12/schema";

    if (base) {
      jsonSchema.title = base.name;
      jsonSchema.description = base.description;
    }

    if (content.id && jsonSchema.properties) {
      const idSchema: StringJsonSchema = {
        type: "string",
        format: content.id.type?.toLowerCase(),
      };

      jsonSchema.properties.id = idSchema;
      jsonSchema.required = [...(jsonSchema.required ?? []), "id"];
    }

    return jsonSchema;
  }

  static toZod(
    content: ContentDetailedView | undefined
  ): ContentZod | undefined {
    let contentZod: ContentZod | undefined;

    if (content) {
      //TODO: Improve this edge cases
      const {
        credentialSubject: { id, ...credentialSubject },
        ...rest
      } = content;
      const schemaWithoutId = this.removeIdFromSchema(credentialSubject);
      contentZod = {
        ...rest,
        credentialSubject: JsonSchemaMapper.toZod(schemaWithoutId),
      };
    }

    return contentZod;
  }

  static removeIdFromSchema(schema: ObjectJsonSchema): ObjectJsonSchema {
    const { properties, ...rest } = schema;
    const schemaWithoutId: ObjectJsonSchema = rest;

    if (properties) {
      const { id, ...otherProps } = properties;
      schemaWithoutId.properties = otherProps;
      schemaWithoutId.required = schema.required?.filter(
        (prop) => prop !== "id"
      );
    }

    return schemaWithoutId;
  }

  static equals(prev: ObjectJsonSchema, next: ObjectJsonSchema): boolean {
    let equals = false;
    if (prev) {
      equals = deepEqual(next, prev);
    }
    return equals;
  }
}
