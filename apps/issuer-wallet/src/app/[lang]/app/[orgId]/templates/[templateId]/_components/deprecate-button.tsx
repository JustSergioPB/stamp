"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { updateTemplateStateAction } from "@features/credentials/template/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { FileX2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  disabled?: boolean;
  templateId: string;
}

export default function DeprecateButton({ lang, disabled, templateId }: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const confirm = z.object({
    word: z
      .string()
      .refine(
        (value) =>
          value.trim().toLowerCase() === t("deprecate.label").toLowerCase(),
        t("deprecate.error.noMatch")
      ),
  });

  type Confirm = z.infer<typeof confirm>;

  const form = useForm<Confirm>({
    resolver: zodResolver(confirm),
    defaultValues: { word: "" },
  });

  async function handleSubmit() {
    setLoading(true);
    const result = await updateTemplateStateAction(templateId, "deprecated");
    setLoading(false);

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
      setOpen(false);
    }
  }

  function handleReset() {
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={disabled || loading}
          onClick={() => setOpen(true)}
        >
          <FileX2 className="h-4 w-4 mr-2" />
          {t("deprecate.label")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("deprecate.title")}</DialogTitle>
          <DialogDescription>{t("deprecate.description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    {t("deprecate.form.word.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("deprecate.form.word.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="ghost"
                type="reset"
                onClick={handleReset}
                disabled={loading}
              >
                {tAction("cancel")}
              </Button>
              <Button type="submit" variant="destructive" disabled={loading}>
                {loading && (
                  <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                )}
                {t("deprecate.confirm")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
