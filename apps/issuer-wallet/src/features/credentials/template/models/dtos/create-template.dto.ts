import { Template } from "../domain";

export type CreateTemplateDTO = Pick<Template, "orgId" | "content" | "state">;
