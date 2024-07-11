import { ContentZod } from "../zod";

export type Content = Omit<ContentZod, "credentialSubject"> & {
  jsonSchemaId: string;
};
