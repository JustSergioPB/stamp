"use client";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "@stamp/domain";
import { CirclePlus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaNodeForm, formSchemaNode } from "./schema-node-form";

type Props = {
  schema?: Schema;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  types: z.string().min(1, { message: "You must submit at least one" }),
  credentialSubject: z
    .array(formSchemaNode)
    .min(1, { message: "You must submit at least one" }),
});

export default function SchemaForm({ schema }: Props) {
  const primitives = schema?.toPrimitive();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: primitives?.name ?? "",
      types: primitives?.types.join(",") ?? [].join(","),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "credentialSubject",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Breed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="types"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Types</FormLabel>
              <FormControl>
                <Input placeholder="Ownership" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="grow shrink-0 basis-auto flex flex-col">
          <FormLabel>Data</FormLabel>
          <div className="block grow shrink-0 basis-auto h-0 overflow-y-auto">
            <ul className="w-full">
              {fields.map((_, index) => (
                <SchemaNodeForm
                  control={form.control}
                  index={index}
                  remove={remove}
                  parent="credentialSubject"
                />
              ))}
            </ul>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() =>
                append({
                  label: "",
                  type: "string",
                  properties: [],
                })
              }
            >
              <CirclePlus className="h-4 w-4 mr-2" />
              Add property
            </Button>
          </div>
        </FormItem>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
