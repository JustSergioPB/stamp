import { Template, TemplateDetailedView } from "../models";

export class TemplateUtils {
  static canEdit(template: Template | TemplateDetailedView): boolean {
    return template.templateStatus === "draft";
  }

  static canEmit(template: Template | TemplateDetailedView): boolean {
    return (
      template.templateStatus !== "draft" &&
      template.templateStatus !== "deprecated"
    );
  }
}
