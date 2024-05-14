import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { recursiveSchemaNodeForm } from "./use-schema-node-form";

export const schemaForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  types: z
    .array(z.string())
    .min(1, { message: "You must submit at least one type" }),
  lang: z.string().min(1, { message: "Language is required" }),
  properties: z
    .array(recursiveSchemaNodeForm)
    .min(1, { message: "You must submit at least one property" }),
});

export type FormSchema = z.infer<typeof schemaForm>;

export function useSchemaForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      types: [],
      properties: [],
      lang: "es",
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
