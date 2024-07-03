import { z } from "zod";
import { contentZod } from "./content.zod";
import { securityZod } from "./security.zod";
import { statusZod } from "./status.zod";
import { baseZod } from "./base.zod";
import { validityZod } from "./validity.zod";

export const templateZod = z.object({
  base: baseZod.optional(),
  content: contentZod.optional(),
  security: securityZod.optional(),
  status: statusZod.optional(),
  validity: validityZod.optional(),
});

export type TemplateZod = z.infer<typeof templateZod>;
