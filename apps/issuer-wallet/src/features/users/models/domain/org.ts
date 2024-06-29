import { OrgZod } from "../zod";

export const orgTypes = ["public", "private", "individual"] as const;
export type OrgType = (typeof orgTypes)[number];

export type Org = OrgZod & {
  id: string;
  createdAt: string;
  modifiedAt: string;
};
