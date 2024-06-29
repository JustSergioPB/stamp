"use server";

import { CommandResult } from "@lib/command";

export async function sendMagicLinkCommand(
  email: string
): Promise<CommandResult<void>> {
  // send magic link to email
  return {
    data: null,
    errorCode: null,
  };
}
