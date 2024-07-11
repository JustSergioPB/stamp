import { Template, TemplateSummaryView } from "../models";

export class SummaryMapper {
  static map(data: Template): TemplateSummaryView {
    return {
      id: data.id,
      name: data.base?.name,
      state: data.state,
      type: data.base?.type,
      lang: data.base?.lang,
    };
  }
}
