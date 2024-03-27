import * as mongodb from "mongodb";
import {
  SchemaDocument,
  SchemaValidator,
} from "@collections/schema.collection";

//TODO: Implement better type safety for collections
export const collections: {
  schemas?: mongodb.Collection<SchemaDocument>;
} = {};

export async function connectToDatabase(
  uri: string,
  name: string
): Promise<void> {
  const client = new mongodb.MongoClient(uri);
  await client.connect();
  const db = client.db(name);
  await db
    .command({ collMod: "schemas", validator: SchemaValidator })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("schemas", {
          validator: SchemaValidator,
        });
      }
    });
  collections["schemas"] = db.collection("schemas");
}
