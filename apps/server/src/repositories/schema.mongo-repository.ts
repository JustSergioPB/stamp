import { Page } from "@domain/page";
import { Schema, SchemaId, SchemaQuery } from "@domain/schema";
import { SchemaRepository } from "./schema.repository";
import { collections } from "../database";

export class SchemaMongoRepository extends SchemaRepository {
  async searchSchemas(query: SchemaQuery): Promise<Page<Schema>> {
    if (!collections.schemas) {
      throw new Error("'Schemas' collection not found");
    }
    const { page, pageSize } = query;
    const skip = page * Number(pageSize);
    const cursor = collections.schemas
      .find()
      .skip(skip)
      .limit(Number(pageSize));

    const items = await cursor.toArray();
    const count = await collections.schemas.countDocuments();
    return {
      items: items.map((item) =>
        Schema.fromJson({
          id: item._id.toString(),
          name: item.name,
        })
      ),
      page,
      pageSize,
      count,
    };
  }

  async getSchema(id: SchemaId): Promise<Schema> {
    if (!collections.schemas) {
      throw new Error("'Schemas' collection not found");
    }

    const document = await collections.schemas.findOne({ id });

    if (!document) {
      throw new Error("Schema not found");
    }

    return Schema.fromJson({
      id: document._id.toString(),
      name: document.name,
    });
  }
}
