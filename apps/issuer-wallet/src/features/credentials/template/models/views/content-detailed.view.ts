import { ObjectJsonSchema } from "@stamp/domain";
import { ContentZod } from "../zod";

export type ContentDetailedView = Pick<ContentZod, "id"> & {
  credentialSubject: ObjectJsonSchema & { id: string };
};
