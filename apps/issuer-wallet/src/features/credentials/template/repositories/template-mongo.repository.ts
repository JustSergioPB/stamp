import { ObjectId } from "mongodb";
import { MongoRepository } from "@lib/mongo";
import { PaginatedList, SearchParams } from "@lib/query";
import {
  CreateTemplateDTO,
  Template,
  TemplateDetailedView,
  UpdateTemplateDTO,
} from "../models";
import { QueryMapper } from "@lib/mongo";

export type TemplateMongo = Omit<Template, "id" | "createdAt">;
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
      items: documents.map(({ _id, ...document }) => ({
        ...document,
        id: _id.toString(),
      })),
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

    const document = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!document) {
      throw new Error("Template not found");
    }

    return {
      ...document,
      id: document._id.toString(),
    };
  }

  static async create(create: CreateTemplateDTO): Promise<string> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const documentRef = await collection.insertOne(create);

    return documentRef.insertedId.toString();
  }

  static async update(
    id: string,
    template: UpdateTemplateDTO
  ): Promise<string> {
    const collection = await this.connect<TemplateMongo>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const documentRef = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...template, modifiedAt: new Date().toISOString() } }
    );

    if (!documentRef.upsertedId) {
      throw new Error("Template not found");
    }

    return documentRef.upsertedId.toString();
  }
}
