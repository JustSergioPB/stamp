"use server";

import { ActionResult } from "@lib/action";
import { revalidatePath } from "next/cache";
import { TemplateMongoRepository } from "../repositories";
import {
  BaseZod,
  Content,
  ContentZod,
  Template,
  TemplateDetailedView,
  UpdateTemplateDTO,
} from "../models";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { verifySession } from "@features/auth/server";
import { JsonSchemaMongoRepository } from "@features/credentials/json-schema/repositories";
import { Session } from "@features/auth/models";
import { JsonSchemaMapper } from "@features/credentials/json-schema/utils";
import { ObjectJsonSchema, StringJsonSchema } from "@stamp/domain";

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

    let template: Partial<Template> = rest;

    if (content) {
      const prev = await TemplateMongoRepository.getById(id);
      const contentUpdated = await handleContent(prev, content, session);

      template = {
        ...template,
        content: contentUpdated,
      };
    }

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

async function handleContent(
  prev: TemplateDetailedView,
  content: ContentZod,
  session: Session
): Promise<Content> {
  let equals = false;
  let jsonSchemaId: string | undefined;
  const jsonSchema = getJsonSchema(content, prev.base);

  if (prev.content && prev.content.credentialSubject) {
    const { id, ...withoutId } = prev.content.credentialSubject;
    equals = deepEqual(jsonSchema, withoutId);
    console.log(equals);
    jsonSchemaId = id;
  }

  if (!equals) {
    jsonSchemaId = await createContent(session, jsonSchema);
  }

  if (!jsonSchemaId) {
    throw new Error("Json Schema Id not found");
  }

  return {
    id: content.id,
    jsonSchemaId,
  };
}

function getJsonSchema(content: ContentZod, base?: BaseZod): ObjectJsonSchema {
  const jsonSchema = JsonSchemaMapper.toDomain(content.credentialSubject)
    .schema as ObjectJsonSchema;

  jsonSchema.$schema = "https://json-schema.org/draft/2020-12/schema";

  if (base) {
    jsonSchema.title = base.name;
    jsonSchema.description = base.description;
  }

  if (content.id && jsonSchema.properties) {
    const idSchema: StringJsonSchema = {
      type: "string",
      format: content.id.type?.toLowerCase(),
    };

    jsonSchema.properties.id = idSchema;
    jsonSchema.required = [...(jsonSchema.required ?? []), "id"];
  }

  return jsonSchema;
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

function isObject(obj: any): boolean {
  return obj !== null && typeof obj === "object";
}

function deepEqual(obj1: any, obj2: any): boolean {
  const differences: string[] = [];

  function compare(obj1: any, obj2: any, path: string): boolean {
    console.log("obj1", Object.keys(obj1));
    console.log("obj2", Object.keys(obj2));
    if (obj1 === obj2) {
      return true;
    }

    if (!isObject(obj1) || !isObject(obj2)) {
      differences.push(`Difference at ${path}: ${obj1} !== ${obj2}`);
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      differences.push(`Different number of keys at ${path}`);
      return false;
    }

    let areEqual = true;
    for (const key of keys1) {
      if (!keys2.includes(key)) {
        differences.push(`Key ${key} missing in second object at ${path}`);
        areEqual = false;
      } else {
        if (!compare(obj1[key], obj2[key], `${path}.${key}`)) {
          areEqual = false;
        }
      }
    }

    return areEqual;
  }

  const result = compare(obj1, obj2, "");

  if (!result) {
    console.log("Differences:");
    differences.forEach((diff) => console.log(diff));
  }

  return result;
}
