import {
  FormControl,
  FormDescription,
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
import { Badge } from "@components/ui/badge";
import { useState } from "react";
import { Button } from "@components/ui/button";
import { X } from "lucide-react";
import { Control } from "react-hook-form";
import { TemplateSchema } from "@schemas/template/template.schema";

type Props = {
  control?: Control<TemplateSchema, any>;
};

export default function BaseForm({ control }: Props) {
  const [types, setTypes] = useState<string>("");

  return (
    <>
      <div className="flex items-center gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="basis-auto grow">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["en", "es"].map((schemaLang) => (
                    <SelectItem key={schemaLang} value={schemaLang}>
                      {schemaLang}
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
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipos</FormLabel>
            <FormControl>
              <div className="max-w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    value={types}
                    placeholder="Type..."
                    onChange={(e) => setTypes(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }

                      if (e.key === "Enter" && types !== "") {
                        field.onChange([...(field.value ?? []), types]);
                        setTypes("");
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={field.value?.length === 0}
                    onClick={() => field.onChange([])}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 bg-neutral-100 rounded-lg p-2 min-h-10">
                  {field.value?.map((type, index) => (
                    <Badge
                      key={index}
                      onClick={() =>
                        field.onChange(
                          field.value?.filter((_, i) => i !== index)
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
              "hint for the user to know what to type in the input field"
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
