import { TemplateSchema } from "@schemas/template/template.schema";
import * as mongodb from "mongodb";

//TODO: Implement better type safety for collections
export const collections: {
  templates?: mongodb.Collection<TemplateSchema>;
} = {};

export async function connectToDatabase(
  uri: string,
  name: string
): Promise<void> {
  const client = new mongodb.MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(name);
    await db
      .command({ collMod: "templates" })
      .catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
          await db.createCollection("templates");
        }
      });
    collections.templates = db.collection("templates");
  } catch (error) {
    //TODO: Should retry
    await client.close();
  }
}
