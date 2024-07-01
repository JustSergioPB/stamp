import { MongoRepository } from "@lib/mongo";
import { AuditLog, CreateAuditLogDTO } from "../models";

export type MongoAuditLog = Omit<AuditLog, "id" | "timestamp">;

export class AuditLogMongoRepository extends MongoRepository {
  static async create(auditLog: CreateAuditLogDTO): Promise<void> {
    const collection = await this.connect<MongoAuditLog>("auditLogs");

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    await collection.insertOne(auditLog);
  }
}
