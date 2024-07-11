import { ObjectId } from "mongodb";
import { MongoRepository } from "@lib/mongo";
import { PaginatedList, SearchParams } from "@lib/query";
import { CreateTemplateDTO, Template } from "../models";
import { QueryMapper } from "@lib/mongo";

export type TemplateMongo = Omit<Template, "id" | "orgId" | "jsonSchemaId"> & {
  _orgId: ObjectId;
  _jsonSchemaId?: ObjectId;
};
export class TemplateMongoRepository extends MongoRepository {
  static collectionName = "templates";

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
      items: documents.map(({ _id, _orgId, ...document }) => {
        let base: Template = {
          ...document,
          id: _id.toString(),
          orgId: _orgId.toString(),
        };

        return base;
      }),
      count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      pageSize,
    };
  }

  static async getById(id: string): Promise<Template> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const document = await collection.findOne({ _id: new ObjectId(id) });

    if (!document) {
      throw new Error("Template not found");
    }

    const { _id, _orgId, ...rest } = document;

    return {
      ...rest,
      id: _id.toString(),
      orgId: _orgId.toString(),
    };
  }

  static async create(create: CreateTemplateDTO): Promise<string> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { orgId, ...rest } = create;

    const documentRef = await collection.insertOne({
      _orgId: new ObjectId(orgId),
      ...rest,
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

    const { id: _, orgId, jsonSchemaId, ...rest } = template;
    //TODO: patch so jsonSchemaId is inmutable

    let update: Partial<TemplateMongo> = rest;

    if (jsonSchemaId) {
      update = { ...update, _jsonSchemaId: new ObjectId(jsonSchemaId) };
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...update,
        },
      }
    );
  }
}
