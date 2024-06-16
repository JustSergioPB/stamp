import { ZodSchema, z } from "zod";
import { arraySchema } from "./array.schema";
import { booleanSchema } from "./boolean.schema";
import { integerSchema } from "./integer.schema";
import { nullSchema } from "./null.schema";
import { numberSchema } from "./number.schema";
import { stringSchema } from "./string.schema";

export const jsonSchema: ZodSchema = z.union([
  stringSchema,
  numberSchema,
  integerSchema,
  booleanSchema,
  //objectSchema,
  arraySchema,
  nullSchema,
]);

export type JsonSchema = z.infer<typeof jsonSchema>;