import { Schema, SchemaId } from "@stamp/domain";
import { Query, QueryResult } from "../../query/models";
import { collections, connectToDatabase } from "../../lib";
import { ObjectId } from "mongodb";

export async function searchSchemas(
  query: Query<Schema>
): Promise<QueryResult<Schema>> {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }
  await connectToDatabase();

  if (!collections.schemas) {
    throw new Error("'Schemas' collection not found");
  }
  const { page, pageSize, orderBy, orderDirection } = query;
  const skip = page * Number(pageSize);
  const cursor = collections.schemas.find().skip(skip).limit(Number(pageSize));

  if (orderBy) {
    cursor.sort({ [orderBy]: orderDirection === "desc" ? -1 : 1 });
  }

  const items = await cursor.toArray();
  const count = await collections.schemas.countDocuments();

  return {
    items: items.map(({ _id, ...rest }) =>
      Schema.fromPrimitive({
        id: _id.toString(),
        ...rest,
      })
    ),
    count,
    currentPage: query.page,
    totalPages: Math.ceil(count / query.pageSize),
    pageSize: query.pageSize,
  };
}

export async function get(id: SchemaId): Promise<Schema> {
  if (!collections.schemas) {
    throw new Error("'Schemas' collection not found");
  }

  const document = await collections.schemas.findOne({
    _id: new ObjectId(id),
  });

  if (!document) {
    throw new Error("Schema not found");
  }

  const { _id, ...rest } = document;

  return Schema.fromPrimitive({
    id: _id.toString(),
    ...rest,
  });
}

export async function createSchema(schema: Schema): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await connectToDatabase();

  if (!collections.schemas) {
    throw new Error("'Schemas' collection not found");
  }

  await collections.schemas.insertOne(schema.toPrimitive());
}
