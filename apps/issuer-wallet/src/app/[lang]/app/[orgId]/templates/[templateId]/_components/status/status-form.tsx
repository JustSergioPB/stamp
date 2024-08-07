"use client";

import { updateTemplateAction } from "@features/credentials/template/actions/template.actions";
import ChipInput from "@components/stamp/chip-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Switch } from "@components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { LoaderCircle, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { StatusZod, statusZod } from "@features/credentials/template/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  lang: string;
  templateId: string;
  formValue?: StatusZod;
  disabled?: boolean;
}

export default function StatusForm({
  lang,
  templateId,
  formValue,
  disabled,
}: Props) {
  const { t } = useTranslation(lang, "template");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<StatusZod>({
    resolver: zodResolver(statusZod),
    defaultValues: formValue,
  });

  const statusList = form.watch("states");

  async function onSubmit(data: StatusZod) {
    setLoading(true);

    const result = await updateTemplateAction(templateId, {
      status: data,
    });

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
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.status.title")}</DialogTitle>
          <DialogDescription>{t("form.status.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="revocable"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="revocable"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor="revocable">
                        {t("form.status.revocable.label")}
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suspendable"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="suspendable"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor="suspendable">
                        {t("form.status.suspendable.label")}
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="states"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.status.states.label")}</FormLabel>
                  <FormControl className="w-full">
                    <ChipInput
                      defaultValue={field.value}
                      placeholder={t("form.status.states.placeholder")}
                      onRemove={(value: string[]) => field.onChange(value)}
                      onEnter={(value: string[]) => field.onChange(value)}
                      onReset={() => {
                        field.onChange([]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.status.states.hint")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultState"
              render={({ field }) => (
                <FormItem className="basis-5/12">
                  <FormLabel>{t("form.status.default.label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!statusList?.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("form.status.default.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusList?.map((status, index) => (
                        <SelectItem key={`${status}-${index}`} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                {loading && (
                  <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                )}
                {tAction("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
