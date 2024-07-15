"use server";

import { ActionResult } from "@lib/action";
import { ActionCreateUserDTO, Nonce } from "../models";
import { UserMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { verifySession } from "../server";

export async function createUserAction(
  create: ActionCreateUserDTO
): Promise<ActionResult<void>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("Forbidden");
    }

    const userId = await UserMongoRepository.create({
      ...create,
      orgId: session.orgId,
      nonce: Nonce.generate(),
    });

    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "create",
      collection: UserMongoRepository.collectionName,
      documentId: userId,
      changes: create,
    });

    revalidatePath("/users");

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
