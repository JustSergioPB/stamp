"use client";

import { Button } from "@components/ui/button";
import { useTranslation } from "@i18n/client";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { OrgZod, defaultOrgZod, orgZod } from "@features/auth/models/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { orgTypes } from "@features/auth/models";
import { createOrgCommand } from "@features/auth/commands";

type Props = {
  lang: string;
};

export default function AddButton({ lang }: Props) {
  const { t } = useTranslation(lang, "orgs");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<OrgZod>({
    resolver: zodResolver(orgZod),
    defaultValues: defaultOrgZod,
  });

  async function handleSubmit(formData: OrgZod) {
    setLoading(true);

    const result = await createOrgCommand(formData);

    if (result.errorCode) {
      toast.error(tError(result.errorCode));
    } else {
      toast.success(tAction("success"));
      setOpen(false);
    }

    setLoading(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)} disabled={loading}>
          {loading ? (
            <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <CirclePlus className="h-4 w-4 mr-2" />
          )}
          {t("add")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("form.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.name.placeholder")}
                      {...field}
                      required
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <FormMessage>{t(fieldState.error.message)}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("form.type.label")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.type.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orgTypes.map((orgType) => (
                        <SelectItem key={orgType} value={orgType}>
                          {t(`types.${orgType}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error?.message && (
                    <FormMessage>{t(fieldState.error.message)}</FormMessage>
                  )}
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
                {tAction("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
