import { Claim, ClaimPrimitive } from "./claim";

export const valueType = [
  "string",
  "number",
  "boolean",
  "object",
  "list",
  "did",
  "date",
];
export type ValueType = (typeof valueType)[number];

export type SchemaNodePrimitive = {
  label: string;
  valueType: ValueType;
  lang?: string;
  valueSubtype?: ValueType;
  types?: string[];
  properties?: ClaimPrimitive;
};

export class SchemaNode {
  private _label: string;
  private _valueType: ValueType;
  private _lang?: string;
  private _valueSubtype?: ValueType;
  private _types?: string[];
  private _properties?: Claim;

  private constructor(
    label: string,
    valueType: ValueType,
    lang?: string,
    properties?: Claim,
    valueSubtype?: ValueType,
    types?: string[]
  ) {
    this._label = label;
    this._lang = lang;
    this._valueType = valueType;
    this._properties = properties;
    this._valueSubtype = valueSubtype;
    this._types = types;
  }

  static create(create: SchemaNodePrimitive): SchemaNode {
    return SchemaNode.fromPrimitive(create);
  }

  static fromPrimitive(props: SchemaNodePrimitive): SchemaNode {
    const sanitized = SchemaNode.sanitize(props);
    SchemaNode.validate(sanitized);
    let properties: Claim | undefined;
    if (sanitized.properties) {
      properties = Claim.fromPrimitive(sanitized.properties);
    }
    return new SchemaNode(
      sanitized.label,
      sanitized.valueType,
      sanitized.lang,
      properties,
      sanitized.valueSubtype,
      sanitized.types
    );
  }

  toPrimitive(): SchemaNodePrimitive {
    const primitive: SchemaNodePrimitive = {
      valueType: this._valueType,
      label: this._label,
    };

    if (this._properties) {
      const properties: ClaimPrimitive = this._properties.toPrimitive();
      primitive.properties = properties;
    }

    if (this._valueSubtype) {
      primitive.valueSubtype = this._valueSubtype;
    }

    if (this._lang) {
      primitive.lang = this._lang;
    }

    if (this._types) {
      primitive.types = this._types;
    }

    return primitive;
  }

  static sanitize(schemaNode: SchemaNodePrimitive): SchemaNodePrimitive {
    const { types, properties, lang, valueSubtype, ...rest } = schemaNode;

    const sanitized: SchemaNodePrimitive = rest;

    if (lang) {
      sanitized.lang = lang;
    }

    if (valueSubtype) {
      sanitized.valueSubtype = valueSubtype;
    }

    if (types && types.filter((type) => type).length) {
      sanitized.types = types;
    }

    if (properties && Object.keys(properties).length !== 0) {
      sanitized.properties = properties;
    }

    return sanitized;
  }

  static validate(schemaNode: SchemaNodePrimitive): void {
    if (!schemaNode.label) {
      throw new Error("Label cannot be empty");
    }
  }
}
