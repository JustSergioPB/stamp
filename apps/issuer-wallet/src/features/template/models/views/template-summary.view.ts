import { Template } from "../domain/template";

export type TemplateSummaryView = Pick<
  Template,
  "id" | "createdAt" | "modifiedAt"
> & {
  name?: string;
  status: "ready" | "not-ready";
  type?: string[];
  lang?: string;
  hasContent: boolean;
  hasCredentialId: boolean;
  hasSecurityAssertion: boolean;
  hasRevocation: boolean;
  hasName: boolean;
  hasType: boolean;
};
