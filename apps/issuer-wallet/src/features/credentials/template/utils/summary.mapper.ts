import { Template, TemplateDetailedView, TemplateSummaryView } from "../models";

export class SummaryMapper {
  static map(data: Template | TemplateDetailedView): TemplateSummaryView {
    return {
      id: data.id,
      name: data.base?.name,
      status: data.templateStatus,
      type: data.base?.type,
      lang: data.base?.lang,
    };
  }
}
