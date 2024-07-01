"use server";

import { CommandResult } from "@lib/command";
import { CreateUserDTO } from "../models";
import { UserMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { AuditLogMongoRepository } from "@features/audit/repositories";
import { CookieSession } from "../utils";

export async function createUserCommand(
  create: CreateUserDTO
): Promise<CommandResult<void>> {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("No secret found");
    }

    const user = await CookieSession.getCurrent(process.env.JWT_SECRET);

    if (create.orgId !== user.orgId) {
      throw new Error("Forbidden");
    }

    const userId = await UserMongoRepository.create(create);
    await AuditLogMongoRepository.create({
      userId: user.id,
      operation: "create",
      collection: "user",
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
