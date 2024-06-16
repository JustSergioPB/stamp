import { ObjectId } from "mongodb";
import { TemplateSchema } from "@schemas/template/template.schema";
import { collections, connectToDatabase } from "../connect";
import { Query, QueryResult } from "@models/query";
import { TemplateMongo } from "@db/models";

export async function searchTemplate(
  query: Query<TemplateMongo>
): Promise<QueryResult<TemplateMongo>> {
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

export async function getTemplate(id: string): Promise<TemplateMongo> {
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

  return { dbId: document._id.toString(), ...document };
}

export async function createTemplate(template: TemplateSchema): Promise<void> {
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

  await collections.templates.insertOne(template);
}
