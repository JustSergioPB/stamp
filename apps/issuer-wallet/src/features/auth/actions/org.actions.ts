"use server";

import { ActionResult } from "@lib/action";
import { CreateOrgDTO } from "../models";
import { OrgMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { verifySession } from "../server";

export async function createOrgAction(
  create: CreateOrgDTO
): Promise<ActionResult<void>> {
  try {
    const session = await verifySession();

    if (!session || session.role !== "superAdmin") {
      throw new Error("Forbidden");
    }

    const orgId = await OrgMongoRepository.create(create);

    await AuditLogMongoRepository.create({
      userId: session.id,
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
