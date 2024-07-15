import { Template } from "../template";

export type CreateTemplateDTO = Pick<Template, "orgId" | "content" | "state">;
