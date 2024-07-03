import { MongoRepository } from "@lib/mongo";

export class CredentialMongoRepository extends MongoRepository {
  private static collectionName = "credentials";
}
