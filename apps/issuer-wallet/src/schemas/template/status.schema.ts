import { z } from "zod";

export const statusSchema = z.object({});

export type StatusSchema = z.infer<typeof statusSchema>;