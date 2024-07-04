import { JsonSchema } from "@stamp/domain";
import { ContentZod } from "../models";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils";

export class ContentMapper {
  static toDomain(content: ContentZod): JsonSchema {
    let properties: { [key: string]: JsonSchema } = {};
    content.credentialSubject.properties.forEach((property) => {
      const { name, schema } = JsonSchemaMapper.toDomain(property);
      properties[name] = schema;
    });
    return {
      properties,
      required: content.credentialSubject.required || [],
      type: "object",
    };
  }
}
