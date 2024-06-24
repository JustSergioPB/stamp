import { ObjectId } from "mongodb";
import { collections, connectToDatabase } from "../connect";
import { Query, QueryResult } from "@models/query";
import { TemplateSchema } from "@schemas/template";

export async function searchTemplate(
  query: Query<TemplateSchema>
): Promise<QueryResult<Partial<TemplateSchema>>> {
  const mongoUri = process.env.MONGODB_URI;
  const mongoName = process.env.MONGODB_NAME;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!mongoName) {
    throw new Error("MONGODB_NAME is not defined");
  }

  await connectToDatabase(mongoUri, mongoName);

  if (!collections.templates) {
    throw new Error("'Templates' collection not found");
  }
  const { page, pageSize, orderBy, orderDirection } = query;
  const skip = page * Number(pageSize);
  const cursor = collections.templates
    .find()
    .skip(skip)
    .limit(Number(pageSize));

  if (orderBy) {
    cursor.sort({ [orderBy]: orderDirection === "desc" ? -1 : 1 });
  }

  const documents = await cursor.toArray();
  const count = await collections.templates.countDocuments();

  return {
    items: documents.map(({ _id, ...document }) => ({
      dbId: _id.toString(),
      ...document,
    })),
    count,
    currentPage: query.page,
    totalPages: Math.ceil(count / query.pageSize),
    pageSize: query.pageSize,
  };
}

export async function getTemplate(
  id: string
): Promise<Partial<TemplateSchema>> {
  const mongoUri = process.env.MONGODB_URI;
  const mongoName = process.env.MONGODB_NAME;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!mongoName) {
    throw new Error("MONGODB_NAME is not defined");
  }

  await connectToDatabase(mongoUri, mongoName);

  if (!collections.templates) {
    throw new Error("'Templates' collection not found");
  }

  const document = await collections.templates.findOne({
    _id: new ObjectId(id),
  });

  if (!document) {
    throw new Error("Schema not found");
  }

  return document;
}

export async function createTemplate(): Promise<string> {
  const mongoUri = process.env.MONGODB_URI;
  const mongoName = process.env.MONGODB_NAME;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!mongoName) {
    throw new Error("MONGODB_NAME is not defined");
  }

  await connectToDatabase(mongoUri, mongoName);

  if (!collections.templates) {
    throw new Error("'Templates' collection not found");
  }

  const documentRef = await collections.templates.insertOne({});
  return documentRef.insertedId.toString();
}

export async function updateTemplate(
  id: string,
  data: Partial<TemplateSchema>
) {
  const mongoUri = process.env.MONGODB_URI;
  const mongoName = process.env.MONGODB_NAME;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!mongoName) {
    throw new Error("MONGODB_NAME is not defined");
  }

  await connectToDatabase(mongoUri, mongoName);

  if (!collections.templates) {
    throw new Error("'Templates' collection not found");
  }

  await collections.templates.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}
