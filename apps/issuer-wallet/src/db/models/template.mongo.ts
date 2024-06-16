import { TemplateSchema } from "@schemas/template/template.schema";

export type TemplateMongo = TemplateSchema & { dbId: string };
