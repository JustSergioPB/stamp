import { EmptyTypesError } from "../errors";
import { Claim, ClaimPrimitive } from "./claim";
import { SchemaStatus } from "./schema-status";

export type SchemaId = string;

export type SchemaPrimitive = {
  id?: SchemaId;
  name: string;
  version: number;
  types: string[];
  lang: string;
  credentialSubject: ClaimPrimitive;
  status: SchemaStatus;
  createdAt: Date;
  modifiedAt: Date;
};

export type CreateSchema = Omit<
  SchemaPrimitive,
  "id" | "version" | "status" | "createdAt" | "modifiedAt"
>;
export type UpdateSchema = { id: SchemaId } & Omit<
  Partial<CreateSchema>,
  "lang"
>;

export class Schema {
  readonly id: SchemaId | undefined;
  private _name: string;
  private _version: number;
  private _type: string[];
  private _credentialSubject: Claim;
  private _status: SchemaStatus;
  private _lang: string;
  private _createdAt: Date;
  private _modifiedAt: Date;

  private constructor(
    name: string,
    type: string[],
    version: number,
    credentialSubject: Claim,
    status: SchemaStatus,
    lang: string,
    createdAt: Date,
    modifiedAt: Date,
    id?: SchemaId
  ) {
    this.id = id;
    this._name = name;
    this._type = type;
    this._version = version;
    this._credentialSubject = credentialSubject;
    this._status = status;
    this._lang = lang;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
  }

  static create(create: CreateSchema): Schema {
    return Schema.fromPrimitive({
      ...create,
      version: 0,
      status: "private",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  }

  static fromPrimitive(props: SchemaPrimitive): Schema {
    const sanitized = Schema.sanitize(props);
    Schema.validate(sanitized);
    const credetialSubject = Claim.fromPrimitive(sanitized.credentialSubject);
    return new Schema(
      sanitized.name,
      sanitized.types,
      sanitized.version,
      credetialSubject,
      sanitized.status,
      sanitized.lang,
      sanitized.createdAt,
      sanitized.modifiedAt,
      sanitized.id
    );
  }

  toPrimitive(): SchemaPrimitive {
    return {
      name: this._name,
      version: this._version,
      types: this._type,
      lang: this._lang,
      credentialSubject: this._credentialSubject.toPrimitive(),
      status: this._status,
      id: this.id,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt,
    };
  }

  private static sanitize(schema: SchemaPrimitive): SchemaPrimitive {
    const { types, ...rest } = schema;
    return {
      ...rest,
      types: types.filter((type) => type),
    };
  }

  private static validate(schema: CreateSchema | SchemaPrimitive): void {
    if (schema.types.length === 0) {
      throw new EmptyTypesError();
    }
  }
}
