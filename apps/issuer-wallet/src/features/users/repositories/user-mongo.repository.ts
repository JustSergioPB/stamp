import { MongoRepository } from "@lib/mongo";
import { CreateUserDTO, User } from "../models";
import { PaginatedList, Query } from "@lib/query";
import { ObjectId } from "mongodb";

export type MongoUser = Omit<User, "id" | "createdAt">;

export class UserMongoRepository extends MongoRepository {
  private static collectionName = "users";

  static async search(query: Query<User>): Promise<PaginatedList<User>> {
    const collection = await this.connect<MongoUser>(
      UserMongoRepository.collectionName
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

  static async getById(id: string): Promise<User> {
    const collection = await this.connect<MongoUser>(
      UserMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const document = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!document) {
      throw new Error("User not found");
    }

    return {
      ...document,
      id: document._id.toString(),
      createdAt: document._id.getTimestamp().toISOString(),
    };
  }

  static async getByEmail(email: string): Promise<User> {
    const collection = await this.connect<MongoUser>(
      UserMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const document = await collection.findOne({
      email,
    });

    if (!document) {
      throw new Error("User not found");
    }

    return {
      ...document,
      id: document._id.toString(),
      createdAt: document._id.getTimestamp().toISOString(),
    };
  }

  static async create(create: CreateUserDTO): Promise<void> {
    const collection = await this.connect<MongoUser>(
      UserMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    await collection.insertOne({
      ...create,
      modifiedAt: new Date().toISOString(),
    });
  }
}
