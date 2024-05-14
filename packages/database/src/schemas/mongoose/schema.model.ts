import { SchemaPrimitive } from "@stamp/domain";

export type SchemaModel = Omit<SchemaPrimitive, "id">;
