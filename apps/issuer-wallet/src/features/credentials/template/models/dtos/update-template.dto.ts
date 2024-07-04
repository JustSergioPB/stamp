import { Template } from "../domain";
import { ContentZod } from "../zod";

export type UpdateTemplateDTO = Partial<
  Omit<Template, "content"> & { content?: ContentZod }
>;
