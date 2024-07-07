import { Template } from "../domain/template";
import { ContentDetailedView } from "./content-detailed.view";

export type TemplateDetailedView = Omit<Template, "content"> & {
  content?: ContentDetailedView;
};
