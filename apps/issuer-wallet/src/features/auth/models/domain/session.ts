import { UserRole } from "./user";

export type Session = {
  id: string;
  orgId: string;
  role: UserRole;
};
