import { Schema, SchemaId, SchemaQuery } from "@domain/schema";
import { Page } from "@domain/page";

export abstract class SchemaRepository {
  abstract searchSchemas(query: SchemaQuery): Promise<Page<Schema>>;
  abstract getSchema(id: SchemaId): Promise<Schema>;
}
