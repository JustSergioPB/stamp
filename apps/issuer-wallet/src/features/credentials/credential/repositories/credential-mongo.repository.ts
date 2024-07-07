import { MongoRepository } from "@lib/mongo";
import { VerifiableCredentialV2 } from "@stamp/domain";

export type VerifiableCredentialMongo = Omit<
  VerifiableCredentialV2,
  "credentialSubject"
>;
export class CredentialMongoRepository extends MongoRepository {
  private static collectionName = "credentials";
}
