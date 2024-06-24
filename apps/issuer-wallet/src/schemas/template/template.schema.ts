import { z } from "zod";
import { contentSchema } from "./content.schema";
import { securitySchema } from "./security.schema";
import { statusSchema } from "./status.schema";
import { baseSchema } from "./base.schema";
import { validitySchema } from "./validity.schema";

export const templateSchema = z.object({
  base: baseSchema,
  content: contentSchema,
  security: securitySchema,
  status: statusSchema,
  validity: validitySchema,
});

export type TemplateSchema = z.infer<typeof templateSchema>;
