import { ObjectJsonSchema, StringJsonSchema } from "@stamp/domain";
import { BaseZod, ContentZod, Template } from "../models";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils";

export class TemplateUtils {
  static canEdit(template: Template): boolean {
    return template.state === "draft";
  }

  static canEmit(template: Template): boolean {
    return template.state !== "draft" && template.state !== "deprecated";
  }

  static cotentToJsonSchema(
    content: ContentZod,
    base?: BaseZod
  ): ObjectJsonSchema {
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
}
