import * as mongodb from "mongodb";

export abstract class MongoRepository<T extends mongodb.Document> {
  protected uri: string;
  protected name: string;
  protected collectionName: string;

  constructor(collectionName: string) {
    const uri = process.env.MONGODB_URI;
    const name = process.env.MONGODB_NAME;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }

    if (!name) {
      throw new Error("MONGODB_NAME is not defined");
    }

    this.name = name;
    this.uri = uri;
    this.collectionName = collectionName;
  }

  protected async connect(): Promise<mongodb.Collection<T> | null> {
    const client = new mongodb.MongoClient(this.uri);

    try {
      await client.connect();
      const db = client.db(this.name);
      await db
        .command({ collMod: this.collectionName })
        .catch(async (error: mongodb.MongoServerError) => {
          if (error.codeName === "NamespaceNotFound") {
            await db.createCollection(this.collectionName);
          }
        });
      return db.collection(this.collectionName);
    } catch (error) {
      //TODO: Should retry
      await client.close();
      return null;
    }
  }
}
