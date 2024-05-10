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
import { ValueType, valueType } from "@stamp/domain";
import { ArrowBigRight, CirclePlus, Trash } from "lucide-react";
import { useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFieldArray,
} from "react-hook-form";
import { z } from "zod";

type Props = {
  control: any;
  index: number;
  parent: string;
  remove: (index: number) => void;
};

const leaf = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  type: z.string().min(1, { message: "Value type is required" }),
  lang: z.string().optional(),
  subtype: z.string().optional(),
  types: z.array(z.string()).optional(),
});

type FormClaim = z.infer<typeof leaf> & {
  properties: FormClaim[];
};

export const formSchemaNode: z.ZodType<FormClaim> = leaf.extend({
  properties: z.lazy(() => formSchemaNode.array()),
});

export function SchemaNodeForm({ control, index, remove, parent }: Props) {
  const {
    fields,
    append,
    remove: subRemove,
  } = useFieldArray({
    control: control,
    name: `${parent}.${index}`,
  });

  const [type, setType] = useState<ValueType>("string");
  const [subtype, setSubtype] = useState<ValueType | undefined>();

  function onTypeChange(
    field: ControllerRenderProps<FieldValues, `${string}.${number}.type`>,
    value: string
  ) {
    setType(value);
    field.onChange(value);
  }

  function onSubtypeChange(
    field: ControllerRenderProps<FieldValues, `${string}.${number}.subtype`>,
    value: string
  ) {
    setSubtype(value);
    field.onChange(value);
  }

  return (
    <li className="w-full" key={`${parent}.${index}`}>
      <div className="flex items-center gap-2 mb-2">
        <FormField
          control={control}
          name={`${parent}.${index}.label`}
          render={({ field }) => (
            <FormItem className="grow basis-auto">
              <FormLabel>Label</FormLabel>
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
          name={`${parent}.${index}.type`}
          render={({ field }) => (
            <FormItem className="basis-1/5">
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={(value) => onTypeChange(field, value)}
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
            name={`${parent}.${index}.subtype`}
            render={({ field }) => (
              <FormItem className="basis-1/5">
                <FormLabel>Subtype</FormLabel>
                <Select
                  onValueChange={(value) => onSubtypeChange(field, value)}
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
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="mt-8"
          onClick={() => remove(index)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <ul className="w-full pl-8">
        {fields.map((_, index) => (
          <SchemaNodeForm
            control={control}
            index={index}
            remove={() => subRemove(index)}
            parent={`${parent}.${index}`}
          />
        ))}
      </ul>
      {(type === "object" || subtype === "object") && (
        <Button
          className="ml-8"
          variant="ghost"
          size="sm"
          type="button"
          onClick={() =>
            append({
              label: "",
              valueType: "string",
              properties: [],
            })
          }
        >
          <CirclePlus className="h-4 w-4 mr-2" />
          Add property
        </Button>
      )}
    </li>
  );
}
