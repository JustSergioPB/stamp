import {
  BaseZod,
  ContentZod,
  SecurityZod,
  StatusZod,
  ValidityZod,
} from "../zod";

export type Template = {
  id: string;
  createdAt: string;
  modifiedAt: string;
  content?: ContentZod;
  base?: BaseZod;
  security?: SecurityZod;
  status?: StatusZod;
  validity?: ValidityZod;
};
