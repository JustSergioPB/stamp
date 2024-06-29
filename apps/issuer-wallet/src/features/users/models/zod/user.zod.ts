import { z } from "zod";
import { userRoles } from "../domain";

export const userZod = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  lastName: z.string().min(1),
  type: z.enum(userRoles),
});

export type UserZod = z.infer<typeof userZod>;
