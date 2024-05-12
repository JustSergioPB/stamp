import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { recursiveSchemaNodeForm } from "./use-schema-node-form";

export const schemaForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  types: z
    .array(z.string())
    .min(1, { message: "You must submit at least one" }),
  properties: z
    .array(recursiveSchemaNodeForm)
    .min(1, { message: "You must submit at least one" }),
});

export type FormSchema = z.infer<typeof schemaForm>;

export function useSchemaForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      types: [],
      properties: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "properties",
  });

  const addSchemaNode = () => {
    append({ name: "", type: "string" });
  };

  const removeSchemaNode = (index: number) => {
    remove(index);
  };

  return {
    form,
    fields,
    addSchemaNode,
    removeSchemaNode,
  };
}
