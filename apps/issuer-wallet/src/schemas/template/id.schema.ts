import { z } from "zod";

export const idSchema = z.object({});

export type IdSchema = z.infer<typeof idSchema>;