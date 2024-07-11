import { MongoRepository } from "@lib/mongo";
import { AuditLog, CreateAuditLogDTO } from "../models";
import * as mongo from "mongodb";

export type MongoAuditLog = Omit<AuditLog, "id" | "userId" | "documentId"> & {
  _userId: mongo.ObjectId;
  _documentId: mongo.ObjectId;
};

export class AuditLogMongoRepository extends MongoRepository {
  static collectionName = "audit-logs";
  
  static async create(auditLog: CreateAuditLogDTO): Promise<void> {
    const collection = await this.connect<MongoAuditLog>(
      AuditLogMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { userId, documentId, ...rest } = auditLog;
    await collection.insertOne({
      ...rest,
      _userId: new mongo.ObjectId(userId),
      _documentId: new mongo.ObjectId(documentId),
      timestamp: new Date().toISOString(),
    });
  }
}
