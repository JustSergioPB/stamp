import { Template, TemplateDetailedView, TemplateSummaryView } from "../models";

export class SummaryMapper {
  static fromTemplate(data: Template): TemplateSummaryView {
    return SummaryMapper.map(data, !!data.content);
  }

  static fromDetailedView(data: TemplateDetailedView): TemplateSummaryView {
    return SummaryMapper.map(data, !!data.content);
  }

  private static map(
    data: Template | TemplateDetailedView,
    isReady: boolean
  ): TemplateSummaryView {
    return {
      id: data.id,
      name: data.base?.name,
      status: isReady ? "ready" : "not-ready",
      type: data.base?.type,
      lang: data.base?.lang,
      createdAt: data.createdAt,
      modifiedAt: data.modifiedAt,
      hasContent: isReady,
      hasCredentialId: !!data.base?.id,
      hasSecurityAssertion: !!data.security?.assertion,
      hasRevocation: !!data.status?.revocable,
      hasName: !!data.base?.name,
      hasType: !!data.base?.type,
    };
  }
}
