export type SchemaJson = {
  id: string | undefined;
  name: string;
};

export class Schema {
  readonly id: string | undefined;
  private name: string;

  private constructor(id: string | undefined, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(name: string): Schema {
    return new Schema(undefined, name);
  }

  static fromJson(props: SchemaJson): Schema {
    return new Schema(props.id, props.name);
  }

  toJson(): SchemaJson {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
