"use client";

import { Button } from "@components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { Dialog } from "@radix-ui/react-dialog";
import { JsonSchema, ObjectJsonSchema } from "@stamp/domain";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodMapperFactory } from "@features/credentials/json-schema/utils";
import { JsonSchemaFormFactory } from "./json-schema-form-factory";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  jsonSchema: JsonSchema;
  lang: string;
  disabled?: boolean;
}

export default function AddButton({ lang, disabled, jsonSchema }: Props) {
  const { t } = useTranslation(lang, "credential");
  const { t: tAction } = useTranslation(lang, "actions");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const mapper = ZodMapperFactory.create(jsonSchema.type);
  const mapped = mapper.map(jsonSchema, true);

  const form = useForm({
    resolver: zodResolver(mapped),
  });

  function handleSubmit() {
    const data = form.getValues();
    console.log(data);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={disabled} onClick={() => setOpen(true)}>
          <CirclePlus className="h-4 w-4 mr-2" />
          {t("actions.create")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{jsonSchema.title ?? t("verifiable")}</DialogTitle>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit, () => {
              console.log("error");
            })}
          >
            <JsonSchemaFormFactory
              lang={lang}
              jsonSchema={jsonSchema}
              prefix="credentialSubject"
              className="max-h-[70vh] overflow-y-auto overflow-x-hidden"
            />
            <DialogFooter>
              <DialogFooter>
                <Button
                  variant="ghost"
                  type="reset"
                  className="max-h-[70vh] overflow-y-auto px-1"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  {tAction("cancel")}
                </Button>
                <Button type="submit" disabled={loading}>
                  {tAction("save")}
                </Button>
              </DialogFooter>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
