import { ObjectId, WithId } from "mongodb";
import { MongoRepository } from "@lib/mongo";
import { PaginatedList, SearchParams } from "@lib/query";
import { CreateTemplateDTO, Template, TemplateDetailedView } from "../models";
import { QueryMapper } from "@lib/mongo";
import {
  JsonSchemaMongo,
  JsonSchemaMongoRepository,
} from "@features/credentials/json-schema/repositories";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils/json-schema-mapper";

export type TemplateMongo = Omit<Template, "id" | "content" | "orgId"> & {
  _orgId: ObjectId;
  content?: {
    id?: boolean;
    _jsonSchemaId: ObjectId;
  };
};

export type TemplateMongoAggregated = WithId<
  Omit<Template, "id" | "content" | "orgId"> & {
    content?: {
      id?: boolean;
      _jsonSchemaId: ObjectId;
    };
    jsonSchema: WithId<JsonSchemaMongo>;
    _orgId: ObjectId;
  }
>;
export class TemplateMongoRepository extends MongoRepository {
  private static collectionName = "templates";

  static async search(query: SearchParams): Promise<PaginatedList<Template>> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { cursor, page, pageSize } = QueryMapper.map(
      query,
      collection.find(),
      Object.keys({} as TemplateMongo)
    );
    const documents = await cursor.toArray();
    const count = await collection.countDocuments();

    return {
      items: documents.map(({ _id, _orgId, content, ...document }) => {
        let base: Template = {
          ...document,
          id: _id.toString(),
          orgId: _orgId.toString(),
        };

        if (content) {
          base = {
            ...base,
            content: {
              id: content.id,
              jsonSchemaId: content._jsonSchemaId.toString(),
            },
          };
        }
        return base;
      }),
      count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      pageSize,
    };
  }

  static async getById(id: string): Promise<TemplateDetailedView> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const documents = await collection
      .aggregate<TemplateMongoAggregated>([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: JsonSchemaMongoRepository.collectionName,
            localField: "content._jsonSchemaId",
            foreignField: "_id",
            as: "jsonSchema",
          },
        },
        {
          $unwind: {
            path: "$jsonSchema",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    if (!documents[0]) {
      throw new Error("Template not found");
    }

    const { _id, _orgId, content, jsonSchema, ...document } = documents[0];

    let base: TemplateDetailedView = {
      ...document,
      id: _id.toString(),
      orgId: _orgId.toString(),
    };

    if (content && jsonSchema) {
      const { _id, ...value } = jsonSchema;
      base = {
        ...base,
        content: {
          id: content.id,
          credentialSubject: JsonSchemaMapper.toZod(value),
        },
      };
    }

    return base;
  }

  static async create(create: CreateTemplateDTO): Promise<string> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const documentRef = await collection.insertOne({
      _orgId: new ObjectId(create.orgId),
    });

    return documentRef.insertedId.toString();
  }

  static async update(id: string, template: Partial<Template>): Promise<void> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { content, ...update } = template;

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...update,
          ...(content && {
            content: {
              id: content.id,
              _jsonSchemaId: new ObjectId(content.jsonSchemaId),
            },
          }),
        },
      }
    );
  }
}