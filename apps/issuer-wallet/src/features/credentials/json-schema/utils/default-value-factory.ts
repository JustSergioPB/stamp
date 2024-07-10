import { JsonSchema, ObjectJsonSchema } from "@stamp/domain";

export class DefaultValueFactory {
  static create(jsonSchema: JsonSchema): any {
    switch (jsonSchema.type) {
      case "string":
        return "";
      case "number":
        return 0;
      case "boolean":
        return false;
      case "object":
        return this.objectValue(jsonSchema as ObjectJsonSchema);
      case "array":
        return [];
    }
  }

  static objectValue(jsonSchema: ObjectJsonSchema): Object {
    let props: { [x: string]: unknown } = {};
    if (jsonSchema.properties) {
      const keys = Object.keys(jsonSchema.properties);
      keys.forEach((key) => {
        if (!jsonSchema.properties?.[key]) return;
        props[key] = DefaultValueFactory.create(jsonSchema.properties[key]);
      });
    }
    return props;
  }
}
