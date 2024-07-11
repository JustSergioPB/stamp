import { Content, TemplateStatus } from "../domain";

export type CreateTemplateDTO = {
  orgId: string;
  content: Content;
  templateStatus: TemplateStatus;
};
