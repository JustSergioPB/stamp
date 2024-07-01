import { User } from "../domain";

export type CreateUserDTO = Omit<
  User,
  "id" | "createdAt" | "modifiedAt" | "nonce"
>;
