import { Button } from "@components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useSchemaNodeForm } from "@hooks/schemas/use-schema-node-form";
import { ValueType, valueType } from "@stamp/domain";
import { ArrowBigRight, CirclePlus, Trash } from "lucide-react";
import { useState } from "react";

type Props = {
  prefix: string;
  id: string;
  children?: React.ReactNode;
};

export function SchemaNodeForm({ prefix, id, children }: Props) {
  const {
    control,
    fields,
    addSchemaNode,
    removeSchemaNode,
    nameInputPath,
    typeInputPath,
    subtypeInputPath,
  } = useSchemaNodeForm(prefix);

  const [type, setType] = useState<ValueType>("string");
  const [subtype, setSubtype] = useState<ValueType | undefined>();

  return (
    <li className="w-full" key={id}>
      <div className="flex items-center gap-2 mb-2">
        <FormField
          control={control}
          name={nameInputPath}
          render={({ field }) => (
            <FormItem className="grow basis-auto">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Breed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ArrowBigRight className="mt-7 text-neutral-400" />
        <FormField
          control={control}
          name={typeInputPath}
          render={({ field }) => (
            <FormItem className="basis-1/5">
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  setType(value);
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="String" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {valueType.map((type) => (
                    <SelectItem value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {type === "list" && (
          <FormField
            control={control}
            name={subtypeInputPath}
            render={({ field }) => (
              <FormItem className="basis-1/5">
                <FormLabel>Subtype</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setSubtype(value);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="String" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {valueType.map((type) => (
                      <SelectItem value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {children}
      </div>
      <ul className="w-full pl-8">
        {fields.map((field, index) => (
          <SchemaNodeForm
            prefix={`${prefix}.properties.${index}`}
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
      {(type === "object" || subtype === "object") && (
        <Button
          className="ml-8"
          variant="ghost"
          size="sm"
          type="button"
          onClick={addSchemaNode}
        >
          <CirclePlus className="h-4 w-4 mr-2" />
          Add property
        </Button>
      )}
    </li>
  );
}
