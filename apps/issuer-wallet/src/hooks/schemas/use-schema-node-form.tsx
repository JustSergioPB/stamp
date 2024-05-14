import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

const schemaNodeForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  lang: z.string().optional(),
  subtype: z.string().min(1, { message: "Subtype is required" }).optional(),
  types: z.array(z.string()).optional(),
});

type SchemaNodeForm = z.infer<typeof schemaNodeForm> & {
  properties?: SchemaNodeForm[];
};

export const recursiveSchemaNodeForm: z.ZodType<SchemaNodeForm> =
  schemaNodeForm.extend({
    properties: z.lazy(() => recursiveSchemaNodeForm.array()),
  });

export function useSchemaNodeForm(prefix: string = "") {
  const form = useFormContext<SchemaNodeForm>();

  const nameInputPath = `${prefix}.name` as "name";
  const typesInputPath = `${prefix}.types` as "types";
  const typeInputPath = `${prefix}.type` as "type";
  const subtypeInputPath = `${prefix}.subtype` as "subtype";
  const propertiesInputPath = `${prefix}.properties` as "properties";

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: propertiesInputPath,
  });

  const addSchemaNode = () => {
    append({ name: "", type: "string" });
  };

  const removeSchemaNode = (index: number) => {
    remove(index);
  };

  return {
    control: form.control,
    fields,
    addSchemaNode,
    removeSchemaNode,
    nameInputPath,
    typeInputPath,
    typesInputPath,
    subtypeInputPath,
  };
}
