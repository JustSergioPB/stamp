import { z } from "zod";
import { contentSchema } from "./content.schema";
import { validitySchema } from "./validity.schema";
import { securitySchema } from "./security.schema";
import { statusSchema } from "./status.schema";
import { idSchema } from "./id.schema";

export const templateSchema = z.object({
  id: idSchema,
  type: z.array(z.string()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  lang: z.string().optional(),
  content: contentSchema,
  security: securitySchema,
  statusSchema: statusSchema,
  validity: validitySchema,
});

export type TemplateSchema = z.infer<typeof templateSchema>;
