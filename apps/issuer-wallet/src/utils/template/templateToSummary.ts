import { Template, TemplateSummary } from "@models/domain/template";

export function templateToSummary(template: Template): TemplateSummary {
  const isReady = !!template.content?.credentialSubject;

  return {
    id: template.id,
    name: template.base?.name,
    status: isReady ? "ready" : "not-ready",
    type: template.base?.type,
    lang: template.base?.lang,
  };
}
