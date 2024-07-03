"use server";

import { ActionResult } from "@lib/action";
import { revalidatePath } from "next/cache";
import { TemplateMongoRepository } from "../repositories";
import { UpdateTemplateDTO } from "../models";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { verifySession } from "@features/auth/server";

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
  template: UpdateTemplateDTO
): Promise<ActionResult<string>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("Forbidden");
    }

    const templateId = await TemplateMongoRepository.update(id, template);
    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "update",
      collection: "template",
      documentId: templateId,
      changes: template,
    });
    revalidatePath(`${templateId}`);
    return { data: templateId, errorCode: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}