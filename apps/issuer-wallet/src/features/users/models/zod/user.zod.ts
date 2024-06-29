import { z } from "zod";
import { userRoles } from "../domain";

export const userZod = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(userRoles),
});

export type UserZod = z.infer<typeof userZod>;

export const defaultUserZod: UserZod = {
  email: "",
  name: "",
  lastName: "",
  role: "issuer",
};
