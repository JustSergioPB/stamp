import { MongoRepository } from "@lib/mongo";
import { Org } from "../models/domain/org";
import { PaginatedList, Query } from "@lib/query";
import { ObjectId } from "mongodb";
import { CreateOrgDTO } from "../models/dtos";

export type MongoOrg = Omit<Org, "id" | "createdAt">;
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

    return {
      ...document,
      id: document._id.toString(),
      createdAt: document._id.getTimestamp().toISOString(),
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
}
