import { TemplateSchema } from "@schemas/template";

export type Template = Partial<TemplateSchema> & {
  id: string;
  createdAt: string;
  modifiedAt: string;
};

export type TemplateUpdate = Omit<Template, "createdAt" | "modifiedAt">;

export type TemplateSummary = {
  id: string;
  name?: string;
  status: "ready" | "not-ready";
  type?: string[];
  lang?: string;
  createdAt: string;
  modifiedAt: string;
};
