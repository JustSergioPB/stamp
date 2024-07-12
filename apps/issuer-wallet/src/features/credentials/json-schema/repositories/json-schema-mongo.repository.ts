import { MongoRepository, QueryMapper } from "@lib/mongo";
import { PaginatedList, SearchParams } from "@lib/query";
import { JsonSchema, ObjectJsonSchema } from "@stamp/domain";
import { ObjectId } from "mongodb";

export type JsonSchemaMongo = JsonSchema;

export class JsonSchemaMongoRepository extends MongoRepository {
  static collectionName = "json-schemas";

  static async create(create: JsonSchema): Promise<string> {
    const collection = await this.connect<JsonSchemaMongo>(
      JsonSchemaMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { insertedId } = await collection.insertOne(create);

    return insertedId.toString();
  }

  static async getById(id: string): Promise<JsonSchema> {
    const collection = await this.connect<JsonSchemaMongo>(
      JsonSchemaMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const schema = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!schema) {
      throw new Error("Schema not found");
    }

    const { _id, ...rest } = schema;

    return {
      ...rest,
    };
  }

  static async search(query: SearchParams): Promise<PaginatedList<JsonSchema>> {
    const collection = await this.connect<JsonSchemaMongo>(
      JsonSchemaMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { cursor, page, pageSize } = QueryMapper.map(
      query,
      collection.find(),
      Object.keys({} as JsonSchemaMongo)
    );
    const documents = await cursor.toArray();
    const count = await collection.countDocuments();

    return {
      items: documents,
      count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      pageSize,
    };
  }
}
