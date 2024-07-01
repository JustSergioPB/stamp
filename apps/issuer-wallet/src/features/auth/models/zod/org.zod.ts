import { z } from "zod";
import { orgTypes } from "../domain";

export const orgZod = z.object({
  name: z.string().min(1),
  type: z.enum(orgTypes),
});

export type OrgZod = z.infer<typeof orgZod>;

export const defaultOrgZod: OrgZod = {
  name: "",
  type: orgTypes[0],
};
