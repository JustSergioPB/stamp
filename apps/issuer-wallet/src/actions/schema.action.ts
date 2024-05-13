"use server";

import { createSchema } from "@stamp/database";
import { Schema, SchemaPrimitive } from "@stamp/domain";
import { revalidatePath } from "next/cache";

export const createSchemaAction = (schema: SchemaPrimitive) => {
  try {
    createSchema(Schema.create(schema));
    revalidatePath("/posts");
  } catch (error) {
    console.error(error);
  }
};
