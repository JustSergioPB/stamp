"use server";

import { TemplateSchema } from "@schemas/template/template.schema";
import { revalidatePath } from "next/cache";
import { createTemplate, searchTemplate } from "@db/repositories";
import { Query } from "@models/query";

export const createTemplateAction = async (template: TemplateSchema) => {
  try {
    await createTemplate(template);
    revalidatePath("/templates");
  } catch (error) {
    console.error(error);
  }
};

export const searchTemplateAction = async (query: Query<TemplateSchema>) => {
  try {
    return await searchTemplate(query);
  } catch (error) {
    console.error(error);
  }
};
