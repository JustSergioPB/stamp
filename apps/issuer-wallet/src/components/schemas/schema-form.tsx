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
import { CirclePlus, Trash } from "lucide-react";
import { SchemaNodeForm } from "./schema-node-form";
import { FormSchema, useSchemaForm } from "@hooks/schemas/use-schema-form";
import TreeAngle from "@components/stamp/tree-angle";

export default function SchemaForm() {
  const { form, addSchemaNode, removeSchemaNode, fields } = useSchemaForm();

  function onSubmit(data: FormSchema) {
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
                <Input placeholder="Dog's passport" {...field} />
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
            <div className="flex">
              <span className="border-l-2 border-l-neutral-300 inline-block"></span>
              <ul className="w-full">
                {fields.map((field, index) => (
                  <SchemaNodeForm prefix={`properties.${index}`} id={field.id}>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="mt-8"
                      onClick={() => removeSchemaNode(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </SchemaNodeForm>
                ))}
              </ul>
            </div>
            <TreeAngle>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={addSchemaNode}
              >
                <CirclePlus className="h-4 w-4 mr-2" />
                Add property
              </Button>
            </TreeAngle>
          </div>
        </FormItem>
        <div className="flex gap-2 justify-end">
          <Button type="reset" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
