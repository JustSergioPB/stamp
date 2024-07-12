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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { updateTemplateStateAction } from "@features/credentials/template/actions";
import { templateStates } from "@features/credentials/template/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { LoaderCircle, Share } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  templateId: string;
  disabled?: boolean;
}

export default function PublishButton({ lang, templateId, disabled }: Props) {
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
          value.trim().toLowerCase() === t("publish.label").toLowerCase(),
        t("publish.error.noMatch")
      ),
    state: z.enum(templateStates),
  });

  type Confirm = z.infer<typeof confirm>;

  const form = useForm<Confirm>({
    resolver: zodResolver(confirm),
    defaultValues: { word: "", state: "private" },
  });

  async function handleSubmit(data: Confirm) {
    setLoading(true);
    const result = await updateTemplateStateAction(templateId, data.state);
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
          <Share className="h-4 w-4 mr-2" />
          {t("publish.label")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("publish.title")}</DialogTitle>
          <DialogDescription>{t("publish.description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="private"
                            className="shrink-0"
                          />
                        </FormControl>
                        <div>
                          <FormLabel>{t("state.private")}</FormLabel>
                          <FormDescription>
                            {t("publish.form.state.private")}
                          </FormDescription>
                        </div>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="public" className="shrink-0" />
                        </FormControl>
                        <div>
                          <FormLabel>{t("state.public")}</FormLabel>
                          <FormDescription>
                            {t("publish.form.state.public")}
                          </FormDescription>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    {t("publish.form.word.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("publish.form.word.placeholder")}
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
              <Button type="submit" disabled={loading}>
                {loading && (
                  <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                )}
                {t("publish.confirm")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
