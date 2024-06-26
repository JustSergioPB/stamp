import { Template, TemplateSummary } from "@models/domain/template";

export function templateToSummary(template: Template): TemplateSummary {
  const isReady = !!template.content?.credentialSubject;

  return {
    id: template.id,
    name: template.base?.name,
    status: isReady ? "ready" : "not-ready",
    type: template.base?.type,
    lang: template.base?.lang,
    createdAt: template.createdAt,
    modifiedAt: template.modifiedAt,
    hasContent: isReady,
    hasCredentialId: !!template.base?.id,
    hasSecurityAssertion: !!template.security?.assertion,
    hasRevocation: !!template.status?.revocable,
    hasName: !!template.base?.name,
    hasType: !!template.base?.type,
  };
}
