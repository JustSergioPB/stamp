import { MongoRepository } from "@lib/mongo";
import { Org } from "../models/domain/org";
import { PaginatedList, Query } from "@lib/query";
import { ObjectId, WithId } from "mongodb";
import { CreateOrgDTO, CreateUserDTO } from "../models/dtos";
import { User } from "../models";

export type MongoUser = WithId<Omit<User, "id" | "createdAt">>;

export type MongoOrg = Omit<Org, "id" | "createdAt" | "users"> & {
  users: MongoUser[];
};

export class OrgMongoRepository extends MongoRepository<MongoOrg> {
  constructor() {
    super("orgs");
  }

  async search(query: Query<Org>): Promise<PaginatedList<Org>> {
    const collection = await this.connect();

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
      items: documents.map(({ _id, users, ...document }) => ({
        id: _id.toString(),
        createdAt: _id.getTimestamp().toISOString(),
        users: users.map((user) => this.mapUser(user)),
        ...document,
      })),
      count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      pageSize: pageSize,
    };
  }

  async getById(id: string): Promise<Org> {
    const collection = await this.connect();

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const document = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!document) {
      throw new Error("Org not found");
    }

    const { users, ...org } = document;

    return {
      ...org,
      id: document._id.toString(),
      createdAt: document._id.getTimestamp().toISOString(),
      users: users.map((user) => this.mapUser(user)),
    };
  }

  async create(create: CreateOrgDTO): Promise<Org> {
    const collection = await this.connect();

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const newDocument = {
      ...create,
      modifiedAt: new Date().toISOString(),
      users: [],
    };

    const documentRef = await collection.insertOne(newDocument);

    return {
      ...newDocument,
      id: documentRef.insertedId.toString(),
      createdAt: documentRef.insertedId.getTimestamp().toISOString(),
    };
  }

  async addUser(orgId: string, user: CreateUserDTO): Promise<void> {
    const collection = await this.connect();

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    await collection.updateOne(
      { _id: new ObjectId(orgId) },
      {
        $push: {
          users: {
            _id: new ObjectId(),
            ...user,
            modifiedAt: new Date().toISOString(),
          },
        },
      }
    );
  }

  private mapUser(user: MongoUser): User {
    return {
      ...user,
      id: user._id.toString(),
      createdAt: user._id.getTimestamp().toISOString(),
    };
  }
}
