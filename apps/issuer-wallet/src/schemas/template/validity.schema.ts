import { z } from "zod";

export const validitySchema = z.object({});

export type ValiditySchema = z.infer<typeof validitySchema>;
