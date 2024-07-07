import { ContentZod } from "../zod";

export type Content = Pick<ContentZod, "id"> & {
  jsonSchemaId: string;
};
