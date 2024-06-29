import { UserZod } from "../zod";

export const userRoles = ["orgAdmin", "issuer", "superAdmin"] as const;
export type UserRole = (typeof userRoles)[number];

export type User = UserZod & {
  id: string;
  orgId: string;
  profilePic: string;
  createdAt: string;
  modifiedAt: string;
};
