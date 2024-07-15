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
import { CredentialSubject, JsonSchema } from "@stamp/domain";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  DefaultValueFactory,
  ZodMapperFactory,
} from "@features/credentials/json-schema/utils";
import { JsonSchemaFormFactory } from "./json-schema-form-factory";
import { Template } from "@features/credentials/template/models";
import { createCredentialAction } from "@features/credentials/credential/actions";
import { toast } from "sonner";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  jsonSchema: JsonSchema;
  template: Template;
  lang: string;
  disabled?: boolean;
}

export default function AddButton({
  lang,
  disabled,
  jsonSchema,
  template,
}: Props) {
  const { t } = useTranslation(lang, "credential");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const mapper = ZodMapperFactory.create(jsonSchema.type);
  const mapped = mapper.map(jsonSchema);
  const defaultValues = DefaultValueFactory.create(jsonSchema);

  const form = useForm({
    resolver: zodResolver(mapped),
    defaultValues,
  });

  async function handleSubmit(data: CredentialSubject) {
    setLoading(true);
    const result = await createCredentialAction(template.id, data);
    setLoading(false);

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
      setOpen(false);
    }
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
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <JsonSchemaFormFactory
              lang={lang}
              jsonSchema={jsonSchema}
              prefix=""
              className="max-h-[70vh] overflow-y-auto overflow-x-hidden"
            />
            <DialogFooter>
              <DialogFooter>
                <Button
                  variant="ghost"
                  type="reset"
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
