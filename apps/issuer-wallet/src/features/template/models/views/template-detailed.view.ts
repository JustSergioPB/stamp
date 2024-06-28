import { Template } from "../domain/template";
import { ContentZod } from "../zod";

export type TemplateDetailedView = Omit<Template, "credentialSchema"> & {
  content?: ContentZod;
};
