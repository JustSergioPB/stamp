"use server";

import { ActionResult } from "@lib/action";
import { revalidatePath } from "next/cache";
import { TemplateMongoRepository } from "../repositories";
import {
  ContentZod,
  CreateTemplateDTO,
  TemplateState,
  UpdateTemplateDTO,
} from "../models";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { verifySession } from "@features/auth/server";
import { JsonSchemaMongoRepository } from "@features/credentials/json-schema/repositories";
import { Session } from "@features/auth/models";
import { JsonSchema, ObjectJsonSchema } from "@stamp/domain";
import { TemplateUtils } from "../utils";
import { invalidTransitions } from "../constants/invalid-transitions.const";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils";

export async function createTemplateAction(
  content: ContentZod
): Promise<ActionResult<string>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("Forbidden");
    }

    const create: CreateTemplateDTO = {
      orgId: session.orgId,
      state: "draft",
      content,
    };

    const templateId = await TemplateMongoRepository.create(create);
    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "create",
      collection: TemplateMongoRepository.collectionName,
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

    const template = await TemplateMongoRepository.getById(id);

    if (!TemplateUtils.canEdit(template)) {
      throw new Error("Cannot edit templates that are not in draft state");
    }

    await TemplateMongoRepository.update(id, update);
    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "update",
      collection: TemplateMongoRepository.collectionName,
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

export async function updateTemplateStateAction(
  id: string,
  state: TemplateState
): Promise<ActionResult<string>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("Forbidden");
    }

    const template = await TemplateMongoRepository.getById(id);
    let update: UpdateTemplateDTO = { state };

    if (invalidTransitions[template.state].includes(state)) {
      throw new Error("Invalid transition");
    }

    if (state === "private" || (state === "public" && !template.jsonSchemaId)) {
      const { schema: jsonSchema } = JsonSchemaMapper.toDomain(
        template.content.credentialSubject
      );
      const jsonSchemaId = await createContent(session, jsonSchema);
      update = { ...update, jsonSchemaId };
    }

    await TemplateMongoRepository.update(id, update);
    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "update",
      collection: TemplateMongoRepository.collectionName,
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

//TODO: This will only happen when template is public
async function createContent(
  session: Session,
  jsonSchema: JsonSchema
): Promise<string> {
  const jsonSchemaId = await JsonSchemaMongoRepository.create(jsonSchema);

  await AuditLogMongoRepository.create({
    userId: session.id,
    operation: "create",
    collection: JsonSchemaMongoRepository.collectionName,
    documentId: jsonSchemaId,
    changes: jsonSchema,
  });

  return jsonSchemaId;
}
