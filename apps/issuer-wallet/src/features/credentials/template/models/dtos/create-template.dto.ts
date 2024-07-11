import { Content } from "../domain";
import { ContentZod } from "../zod";

export type CreateTemplateDTO = {
  orgId: string;
  content: Content;
};
