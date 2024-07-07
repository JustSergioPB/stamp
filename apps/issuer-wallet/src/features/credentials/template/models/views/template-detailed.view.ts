import { JsonSchema } from "@stamp/domain";
import { Template } from "../domain/template";
import { ContentZod } from "../zod";

export type TemplateDetailedView = Omit<Template, "content"> & {
  content?: {
    id?: ContentZod["id"];
    credentialSubject: JsonSchema & { id: string };
  };
};
