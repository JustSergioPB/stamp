"use server";

import { Query, createSchema, searchSchemas } from "@stamp/database";
import { Schema, SchemaPrimitive } from "@stamp/domain";
import { revalidatePath } from "next/cache";

export const createSchemaAction = async (schema: SchemaPrimitive) => {
  try {
    await createSchema(Schema.create(schema));
    revalidatePath("/schemas");
  } catch (error) {
    console.error(error);
  }
};

export const searchSchemasAction = async (query: Query<Schema>) => {
  try {
    return await searchSchemas(query);
  } catch (error) {
    console.error(error);
  }
};
