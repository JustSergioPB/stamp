import { ObjectJsonSchema } from "@stamp/domain";
import { ContentZod } from "../zod";

export type ContentDetailedView = Omit<ContentZod, "credentialSubject"> & {
  credentialSubject: ObjectJsonSchema & { id: string };
};
