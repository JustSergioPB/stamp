"use server";

import { CommandResult } from "@lib/command";
import { CreateOrgDTO, CreateUserDTO } from "../models";
import { OrgMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { UserMongoRepository } from "../repositories/user-mongo.repository";

export async function createOrgCommand(
  create: CreateOrgDTO
): Promise<CommandResult<null>> {
  try {
    await OrgMongoRepository.create(create);
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
  create: CreateUserDTO
): Promise<CommandResult<null>> {
  try {
    await UserMongoRepository.create(create);
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
