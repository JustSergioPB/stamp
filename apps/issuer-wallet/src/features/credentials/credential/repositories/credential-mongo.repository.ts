import { TemplateMongo } from "@features/credentials/template/repositories";
import { MongoRepository, QueryMapper } from "@lib/mongo";
import { SearchParams, PaginatedList } from "@lib/query";
import { VerifiableCredentialV2 } from "@stamp/domain";

export type VerifiableCredentialMongo = Omit<
  VerifiableCredentialV2,
  "credentialSubject"
>;
export class CredentialMongoRepository extends MongoRepository {
  static collectionName = "credentials";

  static async search(
    query: SearchParams
  ): Promise<PaginatedList<VerifiableCredentialV2>> {
    const collection = await this.connect<VerifiableCredentialV2>(
      CredentialMongoRepository.collectionName
    );

    if (!collection) {
      throw new Error("Failed to retrieve collection");
    }

    const { cursor, page, pageSize } = QueryMapper.map(
      query,
      collection.find(),
      Object.keys({} as TemplateMongo)
    );
    const documents = await cursor.toArray();
    const count = await collection.countDocuments();

    return {
      items: documents.map(({ _id, ...rest }) => ({
        ...rest,
        credentialSubject: {},
      })),
      count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      pageSize,
    };
  }
}
