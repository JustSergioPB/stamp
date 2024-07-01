"use server";

import { CommandResult } from "@lib/command";
import { CreateUserDTO } from "../models";
import { UserMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { AuditLogMongoRepository } from "@features/audit/repositories";

export async function createUserCommand(
  create: CreateUserDTO
): Promise<CommandResult<void>> {
  try {
    const userId = await UserMongoRepository.create(create);
    await AuditLogMongoRepository.create({
      userId: "",
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
