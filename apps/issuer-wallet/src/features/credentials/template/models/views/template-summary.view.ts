import { Template, TemplateState } from "../domain/template";

export type TemplateSummaryView = Pick<Template, "id"> & {
  name?: string;
  state: TemplateState;
  type?: string[];
  lang?: string;
};
