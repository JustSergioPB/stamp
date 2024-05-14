import TreeAngle from "@components/stamp/tree-angle";
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
import { DICTIONARIES } from "@i18n/constants/dictionaries.const";
import { VALUE_TYPE_LANG_MAP } from "@i18n/constants/schemas.const";
import { getDynamicTranslation } from "@i18n/helpers/get-dynamic-translation";
import { Translatable } from "@i18n/types/translatable";
import { ValueType, valueType } from "@stamp/domain";
import { ArrowBigRight, CirclePlus, Trash } from "lucide-react";
import { useState } from "react";

type Props = {
  prefix: string;
  id: string;
  children?: React.ReactNode;
} & Translatable;

export function SchemaNodeForm({ prefix, id, children, lang }: Props) {
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
      <div className="flex">
        <span className="border-b-2 border-b-neutral-300 w-4 inline-block mb-5"></span>
        <div className="flex items-start gap-2 grow">
          <FormField
            control={control}
            name={nameInputPath}
            render={({ field }) => (
              <FormItem className="grow basis-auto">
                <FormLabel>
                  {DICTIONARIES[lang]?.schemaForm.property.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      DICTIONARIES[lang]?.schemaForm.property.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ArrowBigRight className="mt-10 text-neutral-400" />
          <FormField
            control={control}
            name={typeInputPath}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {DICTIONARIES[lang]?.schemaForm.type.label}
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    setType(value);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          DICTIONARIES[lang]?.schemaForm.type.placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {valueType.map((type) => (
                      <SelectItem value={type}>
                        {getDynamicTranslation(
                          lang,
                          VALUE_TYPE_LANG_MAP[type]!
                        )}
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
                <FormItem>
                  <FormLabel>
                    {DICTIONARIES[lang]?.schemaForm.subtype.label}
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setSubtype(value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            DICTIONARIES[lang]?.schemaForm.subtype.placeholder
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {valueType.map((type) => (
                        <SelectItem value={type}>
                          {getDynamicTranslation(
                            lang,
                            VALUE_TYPE_LANG_MAP[type]!
                          )}
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
      </div>
      <div className="flex pl-8">
        <span className="border-l-2 border-l-neutral-300 inline-block"></span>
        <ul className="w-full">
          {fields.map((field, index) => (
            <SchemaNodeForm
              prefix={`${prefix}.properties.${index}`}
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
      {(type === "object" || subtype === "object") && (
        <TreeAngle className="ml-8">
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
      )}
    </li>
  );
}
