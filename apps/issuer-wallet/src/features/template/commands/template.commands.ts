"use server";

import { CommandResult } from "@lib/command/models/command-result";
import { revalidatePath } from "next/cache";
import { TemplateMongoRepository } from "../repositories";
import { Template, TemplateUpdateDTO } from "../models";

export async function createTemplateCommand(): Promise<
  CommandResult<Template>
> {
  try {
    const template = await new TemplateMongoRepository().create();
    return { data: template, errorCode: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}

export async function updateTemplateCommand(
  id: string,
  template: TemplateUpdateDTO
): Promise<CommandResult<void>> {
  try {
    await new TemplateMongoRepository().update(id, template);
    revalidatePath(`${id}`);
    return { data: null, errorCode: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}
