"use server";

import { ActionResult } from "@lib/action";
import { revalidatePath } from "next/cache";
import { TemplateMongoRepository } from "../repositories";
import { ContentZod, UpdateTemplateDTO } from "../models";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { verifySession } from "@features/auth/server";
import { JsonSchemaMongoRepository } from "@features/credentials/json-schema/repositories";
import { Session } from "@features/auth/models";
import { ObjectJsonSchema } from "@stamp/domain";
import { ContentUtils } from "../utils/content.utils";

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

    await TemplateMongoRepository.update(id, update);
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

export async function updateContentAction(
  id: string,
  content: ContentZod
): Promise<ActionResult<string>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("Forbidden");
    }

    const { content: prev, base } = await TemplateMongoRepository.getById(id);
    const next = ContentUtils.toDomain(content, base);
    const { id: prevId, ...credentialSubject } = prev?.credentialSubject ?? {};

    let update = {
      id: content.id,
      isAnonymous: content.isAnonymous,
      jsonSchemaId: "",
    };

    const equals = ContentUtils.equals(
      credentialSubject as ObjectJsonSchema,
      next
    );

    if (!prevId || !credentialSubject || !equals) {
      const jsonSchemaId = await createContent(session, next);
      update = { ...update, jsonSchemaId };
    } else {
      update = { ...update, jsonSchemaId: prevId };
    }

    await TemplateMongoRepository.update(id, { content: update });
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
  session: Session,
  jsonSchema: ObjectJsonSchema
): Promise<string> {
  const jsonSchemaId = await JsonSchemaMongoRepository.create(jsonSchema);

  await AuditLogMongoRepository.create({
    userId: session.id,
    operation: "create",
    collection: "json-schema",
    documentId: jsonSchemaId,
    changes: jsonSchema,
  });

  return jsonSchemaId;
}
