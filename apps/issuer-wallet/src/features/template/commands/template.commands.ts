"use server";

import { CommandResult } from "@lib/command/models/command-result";
import { revalidatePath } from "next/cache";
import { TemplateMongoRepository } from "../repositories";
import { UpdateTemplateDTO } from "../models";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { CookieSession } from "@features/auth/utils";

export async function createTemplateCommand(): Promise<CommandResult<string>> {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("No secret found");
    }

    const user = await CookieSession.getCurrent(process.env.JWT_SECRET);

    const create = { orgId: user.orgId };

    const templateId = await TemplateMongoRepository.create(create);
    await AuditLogMongoRepository.create({
      userId: "",
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

export async function updateTemplateCommand(
  id: string,
  template: UpdateTemplateDTO
): Promise<CommandResult<string>> {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("No secret found");
    }

    const user = await CookieSession.getCurrent(process.env.JWT_SECRET);

    const templateId = await TemplateMongoRepository.update(id, template);
    await AuditLogMongoRepository.create({
      userId: user.id,
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
