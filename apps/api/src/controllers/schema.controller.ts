import { SchemaId, SchemaQuery } from "@domain/schema";
import { SchemaRepository } from "src/repositories/schema.repository";

export class SchemaController {
  private readonly _repository: SchemaRepository;

  constructor(repository: SchemaRepository) {
    this._repository = repository;
  }

  async searchSchemas(query: SchemaQuery) {
    return this._repository.searchSchemas(query);
  }

  async getSchema(id: SchemaId) {
    return this._repository.getSchema(id);
  }
}
