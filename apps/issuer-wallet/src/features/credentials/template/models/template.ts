import {
  BaseZod,
  ContentZod,
  SecurityZod,
  StatusZod,
  ValidityZod,
} from "./zod";

export type Template = {
  base?: BaseZod;
  security?: SecurityZod;
  status?: StatusZod;
  validity?: ValidityZod;
  content: ContentZod;
  orgId: string;
  jsonSchemaId?: string;
  id: string;
  state: TemplateState;
};

export const templateStates = [
  "draft",
  "private",
  "public",
  "deprecated",
] as const;
export type TemplateState = (typeof templateStates)[number];
