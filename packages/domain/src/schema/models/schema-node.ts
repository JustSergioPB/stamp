import { EmptyLabelError } from "../errors";
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
  type: ValueType;
  lang?: string;
  subtype?: ValueType;
  types?: string[];
  properties?: ClaimPrimitive;
};

export class SchemaNode {
  private _label: string;
  private _type: ValueType;
  private _lang?: string;
  private _subtype?: ValueType;
  private _types?: string[];
  private _properties?: Claim;

  private constructor(
    label: string,
    valueType: ValueType,
    lang?: string,
    properties?: Claim,
    subtype?: ValueType,
    types?: string[]
  ) {
    this._label = label;
    this._lang = lang;
    this._type = valueType;
    this._properties = properties;
    this._subtype = subtype;
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
      sanitized.type,
      sanitized.lang,
      properties,
      sanitized.subtype,
      sanitized.types
    );
  }

  toPrimitive(): SchemaNodePrimitive {
    const primitive: SchemaNodePrimitive = {
      type: this._type,
      label: this._label,
    };

    if (this._properties) {
      const properties: ClaimPrimitive = this._properties.toPrimitive();
      primitive.properties = properties;
    }

    if (this._subtype) {
      primitive.subtype = this._subtype;
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
    const { types, properties, lang, subtype, ...rest } = schemaNode;

    const sanitized: SchemaNodePrimitive = rest;

    if (lang) {
      sanitized.lang = lang;
    }

    if (subtype) {
      sanitized.subtype = subtype;
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
      throw new EmptyLabelError();
    }
  }
}
