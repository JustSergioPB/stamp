import {
  BaseZod,
  ContentZod,
  SecurityZod,
  StatusZod,
  ValidityZod,
} from "../zod";

export type Template = {
  base?: BaseZod;
  security?: SecurityZod;
  status?: StatusZod;
  validity?: ValidityZod;
  content?: Content;
  orgId: string;
  id: string;
};

export type Content = Pick<ContentZod, "id"> & {
  jsonSchemaId: string;
};
