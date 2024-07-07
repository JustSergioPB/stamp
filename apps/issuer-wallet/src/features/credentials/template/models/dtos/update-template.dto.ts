import { Template } from "../domain";

export type UpdateTemplateDTO = Partial<Omit<Template, "content">>;
