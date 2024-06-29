"use server";

import { CommandResult } from "@lib/command";
import { CreateOrgDTO, CreateUserDTO } from "../models";
import { OrgMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";

export async function createOrgCommand(
  create: CreateOrgDTO
): Promise<CommandResult<null>> {
  try {
    const repo = new OrgMongoRepository();
    await repo.create(create);
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

export async function addUserToOrgCommand(
  orgId: string,
  create: CreateUserDTO
): Promise<CommandResult<null>> {
  try {
    const repo = new OrgMongoRepository();
    await repo.addUser(orgId, create);
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
