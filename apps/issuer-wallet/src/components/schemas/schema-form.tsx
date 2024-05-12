"use client";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { CirclePlus, Trash, X } from "lucide-react";
import { SchemaNodeForm } from "./schema-node-form";
import { FormSchema, useSchemaForm } from "@hooks/schemas/use-schema-form";
import TreeAngle from "@components/stamp/tree-angle";
import { Badge } from "@components/ui/badge";
import { useState } from "react";

export default function SchemaForm() {
  const { form, addSchemaNode, removeSchemaNode, fields } = useSchemaForm();
  const [types, setTypes] = useState<string>("");

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col gap-4"
      >
        <div className="grow shrink-0 basis-auto h-0 overflow-auto flex flex-col gap-4 px-1">
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
                  <div className="max-w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Input
                        value={types}
                        placeholder="Ownership"
                        onChange={(e) => setTypes(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }

                          if (e.key === "Enter" && types !== "") {
                            field.onChange([...field.value, types]);
                            setTypes("");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={field.value.length === 0}
                        onClick={() => field.onChange([])}
                      >
                        <X className="h-4 w-4"></X>
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 bg-neutral-100 rounded-lg p-2 min-h-10">
                      {field.value.map((type, index) => (
                        <Badge
                          key={index}
                          onClick={() =>
                            field.onChange(
                              field.value.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Hit enter to add a type. Click on a tag to remove it.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="credentialSubject"
            render={() => (
              <FormItem className="grow shrink-0 basis-auto flex flex-col">
                <FormLabel>Data</FormLabel>
                <div className="block grow shrink-0 basis-auto">
                  <div className="flex">
                    <span className="border-l-2 border-l-neutral-300 inline-block"></span>
                    <ul className="w-full">
                      {fields.map((field, index) => (
                        <SchemaNodeForm
                          prefix={`properties.${index}`}
                          id={field.id}
                        >
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
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
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
