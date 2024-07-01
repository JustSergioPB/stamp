import {
  BaseZod,
  ContentZod,
  SecurityZod,
  StatusZod,
  ValidityZod,
} from "../zod";

export type Template = {
  content?: ContentZod;
  base?: BaseZod;
  security?: SecurityZod;
  status?: StatusZod;
  validity?: ValidityZod;
  orgId: string;
  id: string;
};
