"use server";

import { TemplateSchema } from "@schemas/template/template.schema";
import {
  createTemplate,
  searchTemplate,
  updateTemplate,
} from "@db/repositories";
import { Query } from "@models/query";

export const createTemplateAction = async (): Promise<string | null> => {
  try {
    return createTemplate();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTemplateAction = async (
  id: string,
  data: Partial<TemplateSchema>
): Promise<void> => {
  try {
    updateTemplate(id, data);
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
