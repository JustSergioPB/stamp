import { MongoRepository, QueryMapper } from "@lib/mongo";
import { CreateUserDTO, UpdateUserDTO, User } from "../models";
import { ObjectId } from "mongodb";
import { SearchParams, PaginatedList } from "@lib/query";

export type UserMongo = Omit<User, "id" | "orgId"> & {
  _orgId: ObjectId;
};

export class UserMongoRepository extends MongoRepository {
  private static collectionName = "users";

  static async search(query: SearchParams): Promise<PaginatedList<User>> {
    const collection = await this.connect<UserMongo>(
      UserMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { cursor, page, pageSize } = QueryMapper.map(
      query,
      collection.find(),
      Object.keys({} as UserMongo)
    );
    const documents = await cursor.toArray();
    const count = await collection.countDocuments();

    return {
      items: documents.map(({ _id, _orgId, ...document }) => ({
        ...document,
        orgId: _orgId.toString(),
        id: _id.toString(),
      })),
      count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      pageSize,
    };
  }

  static async getById(id: string): Promise<User> {
    const collection = await this.connect<UserMongo>(
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

    const { _id, _orgId, ...rest } = document;

    return {
      ...rest,
      orgId: _orgId.toString(),
      id: _id.toString(),
    };
  }

  static async getByEmail(email: string): Promise<User> {
    const collection = await this.connect<UserMongo>(
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

    const { _id, _orgId, ...rest } = document;

    return {
      ...rest,
      orgId: _orgId.toString(),
      id: _id.toString(),
    };
  }

  static async create(create: CreateUserDTO): Promise<string> {
    const collection = await this.connect<UserMongo>(
      UserMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { orgId, ...rest } = create;

    const documentRef = await collection.insertOne({
      _orgId: new ObjectId(orgId),
      ...rest,
      nonce: Math.floor(Math.random() * 1000000),
    });

    return documentRef.insertedId.toString();
  }

  static async update(id: string, update: UpdateUserDTO): Promise<void> {
    const collection = await this.connect<UserMongo>(
      UserMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: update,
      }
    );
  }
}
