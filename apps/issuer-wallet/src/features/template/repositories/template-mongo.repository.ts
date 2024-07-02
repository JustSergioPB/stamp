import { ObjectId } from "mongodb";
import { MongoRepository } from "@lib/mongo";
import { PaginatedList, Query } from "@lib/query";
import {
  CreateTemplateDTO,
  Template,
  TemplateDetailedView,
  UpdateTemplateDTO,
} from "../models";

export type MongoTemplate = Omit<Template, "id" | "createdAt">;
export class TemplateMongoRepository extends MongoRepository {
  private static collectionName = "templates";

  static async search(
    query: Query<Template>
  ): Promise<PaginatedList<Template>> {
    const collection = await this.connect<MongoTemplate>(
      TemplateMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { page, pageSize, orderBy, orderDirection } = query;
    const skip = page * Number(pageSize);
    const cursor = collection.find().skip(skip).limit(Number(pageSize));

    if (orderBy) {
      cursor.sort({ [orderBy]: orderDirection === "desc" ? -1 : 1 });
    }

    const documents = await cursor.toArray();
    const count = await collection.countDocuments();

    return {
      items: documents.map(({ _id, ...document }) => ({
        ...document,
        id: _id.toString(),
        createdAt: _id.getTimestamp().toISOString(),
      })),
      count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      pageSize: pageSize,
    };
  }

  static async getById(id: string): Promise<TemplateDetailedView> {
    const collection = await this.connect<MongoTemplate>(
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
    const collection = await this.connect<MongoTemplate>(
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
    const collection = await this.connect<MongoTemplate>(
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
