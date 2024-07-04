import { MongoRepository, QueryMapper } from "@lib/mongo";
import { Org } from "../models/domain/org";
import { PaginatedList, SearchParams } from "@lib/query";
import { ObjectId } from "mongodb";
import { CreateOrgDTO } from "../models/dtos";

export type OrgMongo = Omit<Org, "id">;
export class OrgMongoRepository extends MongoRepository {
  private static collectionName = "orgs";

  static async search(query: SearchParams): Promise<PaginatedList<Org>> {
    const collection = await this.connect<OrgMongo>(
      OrgMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { cursor, page, pageSize } = QueryMapper.map(
      query,
      collection.find(),
      Object.keys({} as OrgMongo)
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

  static async getById(id: string): Promise<Org> {
    const collection = await this.connect<OrgMongo>(
      OrgMongoRepository.collectionName
    );

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
    };
  }

  static async create(create: CreateOrgDTO): Promise<string> {
    const collection = await this.connect<OrgMongo>(
      OrgMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const newDocument = {
      ...create,
      modifiedAt: new Date().toISOString(),
      users: [],
    };

    const documentRef = await collection.insertOne(newDocument);

    return documentRef.insertedId.toString();
  }
}
