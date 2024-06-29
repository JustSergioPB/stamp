import { Org } from "../domain/org";

export type CreateOrgDTO = Omit<
  Org,
  "id" | "createdAt" | "modifiedAt" | "users"
>;
