"use server";

import { createTemplate, updateTemplate } from "@db/repositories";
import { CommandResult } from "@models/command/command-result";
import { Template, TemplateUpdate } from "@models/domain/template";
import { revalidatePath } from "next/cache";

export async function createTemplateCommand(): Promise<
  CommandResult<Template>
> {
  try {
    const template = await createTemplate();
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
  template: TemplateUpdate
): Promise<CommandResult<void>> {
  try {
    updateTemplate(template.id, template);
    revalidatePath(`${template.id}`);
    return { data: null, errorCode: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}
