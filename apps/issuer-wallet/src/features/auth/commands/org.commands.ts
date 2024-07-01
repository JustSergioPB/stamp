"use server";

import { CommandResult } from "@lib/command";
import { CreateOrgDTO } from "../models";
import { OrgMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { CookieSession } from "../utils";

export async function createOrgCommand(
  create: CreateOrgDTO
): Promise<CommandResult<void>> {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("No secret found");
    }

    const user = await CookieSession.getCurrent(process.env.JWT_SECRET);

    if (user.role !== "superAdmin") {
      throw new Error("Forbidden");
    }

    const orgId = await OrgMongoRepository.create(create);

    await AuditLogMongoRepository.create({
      userId: user.id,
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
