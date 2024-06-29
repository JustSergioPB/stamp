import { OrgZod } from "../zod";
import { User } from "./user";

export const orgTypes = ["public", "private", "individual"] as const;
export type OrgType = (typeof orgTypes)[number];

export type Org = OrgZod & {
  id: string;
  users: User[];
  email: string;
  phone?: string;
  createdAt: string;
  modifiedAt: string;
};
