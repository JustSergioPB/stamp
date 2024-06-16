import { z } from "zod";

export const securitySchema = z.object({});

export type SecuritySchema = z.infer<typeof securitySchema>;