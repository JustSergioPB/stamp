import { ObjectId } from "mongodb";
import { collections, connectToDatabase } from "../connect";
import { PaginatedList, Query } from "@models/query";
import { Template, TemplateUpdate } from "@models/domain/template";

export async function searchTemplate(
  query: Query<Template>
): Promise<PaginatedList<Template>> {
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
      id: _id.toString(),
      ...document,
      createdAt: _id.getTimestamp().toISOString(),
      modifiedAt: _id.getTimestamp().toISOString(),
    })),
    count,
    currentPage: query.page,
    totalPages: Math.ceil(count / query.pageSize),
    pageSize: query.pageSize,
  };
}

export async function getTemplateById(id: string): Promise<Template> {
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

  return {
    id: document._id.toString(),
    ...document,
    createdAt: document._id.getTimestamp().toISOString(),
    modifiedAt: document._id.getTimestamp().toISOString(),
  };
}

export async function createTemplate(): Promise<Template> {
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

  return {
    id: documentRef.insertedId.toString(),
    createdAt: documentRef.insertedId.getTimestamp().toISOString(),
    modifiedAt: documentRef.insertedId.getTimestamp().toISOString(),
  };
}

export async function updateTemplate(id: string, data: TemplateUpdate) {
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
