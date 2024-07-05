"use server";

import { ActionResult } from "@lib/action";
import { revalidatePath } from "next/cache";
import { TemplateMongoRepository } from "../repositories";
import { Content, ContentZod, Template, UpdateTemplateDTO } from "../models";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { verifySession } from "@features/auth/server";
import { JsonSchemaMongoRepository } from "@features/credentials/json-schema/repositories";
import { Session } from "@features/auth/models";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils";

export async function createTemplateAction(): Promise<ActionResult<string>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("Forbidden");
    }

    const create = { orgId: session.orgId };

    const templateId = await TemplateMongoRepository.create(create);
    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "create",
      collection: "template",
      documentId: templateId,
      changes: create,
    });
    return { data: templateId, errorCode: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}

export async function updateTemplateAction(
  id: string,
  update: UpdateTemplateDTO
): Promise<ActionResult<string>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("Forbidden");
    }

    const { content, ...rest } = update;
    let template: Partial<Template> = content
      ? { ...rest, content: await createContent(content, session) }
      : rest;

    await TemplateMongoRepository.update(id, template);
    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "update",
      collection: "template",
      documentId: id,
      changes: update,
    });
    revalidatePath(`${id}`);
    return { data: id, errorCode: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}

async function createContent(
  content: ContentZod,
  session: Session
): Promise<Content> {
  const jsonSchema = JsonSchemaMapper.toDomain(
    content.credentialSubject
  ).schema;
  const jsonSchemaId = await JsonSchemaMongoRepository.create(jsonSchema);

  await AuditLogMongoRepository.create({
    userId: session.id,
    operation: "create",
    collection: "json-schema",
    documentId: jsonSchemaId,
    changes: jsonSchema,
  });

  return {
    id: content.id,
    jsonSchemaId,
  };
}
