"use server";

import { CommandResult } from "@lib/command";
import { UserMongoRepository } from "../repositories";

export async function sendMagicLinkCommand(
  email: string
): Promise<CommandResult<void>> {
  try {
    const user = await UserMongoRepository.getByEmail(email);
    return {
      data: null,
      errorCode: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "USER_NOT_FOUND",
    };
  }
}
