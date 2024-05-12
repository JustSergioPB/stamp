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
    items: results.map(({ _doc, id }) =>
      Schema.fromPrimitive({ ..._doc, id: id.toString() })
    ),
    count,
    currentPage: query.page,
    totalPages: Math.ceil(count / query.pageSize),
  };
}

export async function createSchema(schema: Schema): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }
  await connectToMongo(mongoUri);
  const schemaModel = new SchemaModel(schema.toPrimitive());
  await schemaModel.save();
}
