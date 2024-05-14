import * as mongodb from "mongodb";
import { SchemaModel } from "../schemas/mongoose/schema.model";
//TODO: Implement better type safety for collections
export const collections: {
  schemas?: mongodb.Collection<SchemaModel>;
} = {};

export async function connectToDatabase(): Promise<void> {
  const { MONGODB_NAME, MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("DATABASE_URI must be provided");
  }

  if (!MONGODB_NAME) {
    throw new Error("DATABASE_NAME must be provided");
  }

  const client = new mongodb.MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_NAME);
    await db
      .command({ collMod: "schemas" })
      .catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
          await db.createCollection("schemas");
        }
      });
    collections["schemas"] = db.collection("schemas");
  } catch (error) {
    //TODO: Should retry
    await client.close();
  }
}
