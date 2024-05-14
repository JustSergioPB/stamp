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
import { CirclePlus, LoaderCircle, Trash, X } from "lucide-react";
import { SchemaNodeForm } from "./schema-node-form";
import { FormSchema, useSchemaForm } from "@hooks/schemas/use-schema-form";
import TreeAngle from "@components/stamp/tree-angle";
import { Badge } from "@components/ui/badge";
import { useState } from "react";
import { ClaimPrimitive, Schema, valueType } from "@stamp/domain";
import { createSchemaAction } from "src/actions/schema.action";
import { Translatable } from "@i18n/types/translatable";
import { DICTIONARIES } from "@i18n/constants/dictionaries.const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { LANG_MAP, VALUE_TYPE_LANG_MAP } from "@i18n/constants/schemas.const";
import { getDynamicTranslation } from "@i18n/helpers/get-dynamic-translation";
import { schemaLang } from "../../../../../packages/domain/src/schema/models/schema-lang";

type Props = {
  onSubmit: () => void;
  onReset: () => void;
} & Translatable;

export default function SchemaForm({ onSubmit, onReset, lang }: Props) {
  const { form, addSchemaNode, removeSchemaNode, fields } = useSchemaForm();
  const [types, setTypes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmitClick(data: FormSchema) {
    try {
      setLoading(true);
      await createSchemaAction(toSchema(data).toPrimitive());
      form.reset();
      onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function onResetClick() {
    form.reset();
    onReset();
  }

  function toSchema(data: FormSchema): Schema {
    const credentialSubject: ClaimPrimitive = {};

    data.properties.forEach(({ name, type, subtype }) => {
      credentialSubject[name] = {
        type: type,
        name,
        subtype,
      };
    });

    return Schema.create({
      name: data.name,
      types: data.types,
      lang: data.lang,
      credentialSubject,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitClick)}
        className="h-full flex flex-col gap-4"
      >
        <div className="grow shrink-0 basis-auto h-0 overflow-auto flex flex-col gap-4 px-1">
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="basis-auto grow">
                  <FormLabel>
                    {DICTIONARIES[lang]?.schemaForm.name.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        DICTIONARIES[lang]?.schemaForm.name.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {DICTIONARIES[lang]?.schemaForm.lang.label}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            DICTIONARIES[lang]?.schemaForm.lang.placeholder
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schemaLang.map((schemaLang) => (
                        <SelectItem value={schemaLang}>
                          {getDynamicTranslation(lang, LANG_MAP[schemaLang]!)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="types"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {DICTIONARIES[lang]?.schemaForm.types.label}
                </FormLabel>
                <FormControl>
                  <div className="max-w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Input
                        value={types}
                        placeholder={
                          DICTIONARIES[lang]?.schemaForm.types.placeholder
                        }
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
                  {DICTIONARIES[lang]?.schemaForm.types.hint}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="properties"
            render={() => (
              <FormItem className="grow shrink-0 basis-auto flex flex-col">
                <FormLabel>
                  {DICTIONARIES[lang]?.schemaForm.data.label}
                </FormLabel>
                <div className="block grow shrink-0 basis-auto">
                  <div className="flex">
                    <span className="border-l-2 border-l-neutral-300 inline-block"></span>
                    <ul className="w-full">
                      {fields.map((field, index) => (
                        <SchemaNodeForm
                          prefix={`properties.${index}`}
                          id={field.id}
                          lang={lang}
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
                      {DICTIONARIES[lang]?.schemaForm.addProperty}
                    </Button>
                  </TreeAngle>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            type="reset"
            variant="ghost"
            onClick={onResetClick}
            disabled={loading}
          >
            {DICTIONARIES[lang]?.schemaForm.discard}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
            {DICTIONARIES[lang]?.schemaForm.save}
          </Button>
        </div>
      </form>
    </Form>
  );
}
