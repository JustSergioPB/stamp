"use server";

import { CommandResult } from "@lib/command";
import { CreateOrgDTO } from "../models";
import { OrgMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { AuditLogMongoRepository } from "@features/audit/repositories";

export async function createOrgCommand(
  create: CreateOrgDTO
): Promise<CommandResult<void>> {
  try {
    const orgId = await OrgMongoRepository.create(create);
    await AuditLogMongoRepository.create({
      userId: "",
      operation: "create",
      collection: "orgs",
      documentId: orgId,
      changes: create,
    });
    revalidatePath("/orgs");
    return {
      data: null,
      errorCode: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}
