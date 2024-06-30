import * as mongodb from "mongodb";

export abstract class MongoRepository {
  protected static async connect<T extends mongodb.Document>(
    collectionName: string
  ): Promise<mongodb.Collection<T> | null> {
    const uri = process.env.MONGODB_URI;
    const name = process.env.MONGODB_NAME;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }

    if (!name) {
      throw new Error("MONGODB_NAME is not defined");
    }

    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const db = client.db(name);
      await db
        .command({ collMod: collectionName })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection(collectionName);
          }
        });
      return db.collection(collectionName);
    } catch (error) {
      //TODO: Should retry
      await client.close();
      return null;
    }
  }
}
