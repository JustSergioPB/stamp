import { Template, TemplateStatus } from "../domain/template";

export type TemplateSummaryView = Pick<Template, "id"> & {
  name?: string;
  status: TemplateStatus;
  type?: string[];
  lang?: string;
};
