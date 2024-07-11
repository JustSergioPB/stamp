import { BaseZod, SecurityZod, StatusZod, ValidityZod } from "../zod";
import { Content } from "./content";

export type Template = {
  base?: BaseZod;
  security?: SecurityZod;
  status?: StatusZod;
  validity?: ValidityZod;
  content: Content;
  orgId: string;
  id: string;
  templateStatus: TemplateStatus;
};

export const templateStatus = [
  "draft",
  "private",
  "public",
  "deprecated",
] as const;
export type TemplateStatus = (typeof templateStatus)[number];
