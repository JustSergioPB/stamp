import { UserZod } from "../zod";

export const userRoles = ["org-admin", "issuer", "super-admin"] as const;
export type UserRole = (typeof userRoles)[number];

export type User = UserZod & {
  id: string;
  createdAt: string;
  modifiedAt: string;
};
