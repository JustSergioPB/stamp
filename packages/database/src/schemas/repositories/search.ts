import { Schema } from "@stamp/domain";
import { Query, QueryResult } from "../../query/models";
import SchemaModel from "../mongoose/schema.model";
import { connectToMongo } from "../../lib/connect";

export async function searchSchemas(
  query: Query<Schema>
): Promise<QueryResult<Schema>> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }
  await connectToMongo(mongoUri);
  const results = await SchemaModel.find().exec();
  const count = await SchemaModel.countDocuments().exec();

  return {
    items: results.map((result) => Schema.fromPrimitive(result)),
    count,
    currentPage: query.page,
    totalPages: Math.ceil(count / query.pageSize),
  };
}
