"use client";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { UserZod, defaultUserZod, userZod } from "@features/users/models/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { useForm } from "react-hook-form";
import { CirclePlus } from "lucide-react";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { userRoles } from "@features/users/models";
import { useState } from "react";
import { addUserToOrgCommand } from "@features/users/commands";
import { toast } from "sonner";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  lang: string;
  orgId: string;
}

export default function AddUserButton({ lang, orgId }: Props) {
  const { t } = useTranslation(lang, "users");
  const { t: tAction } = useTranslation(lang, "actions");
  const { t: tError } = useTranslation(lang, "errors");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<UserZod>({
    resolver: zodResolver(userZod),
    defaultValues: defaultUserZod,
  });

  async function handleSubmit(formData: UserZod) {
    setLoading(true);
    const result = await addUserToOrgCommand({
      ...formData,
      orgId,
      profilePic: "",
    });

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
          <CirclePlus className="h-4 w-4 mr-2" />
          {t("actions.add")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("new")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="basis-5/12">
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
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem className="basis-7/12">
                    <FormLabel>{t("form.lastName.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.lastName.placeholder")}
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
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("form.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.email.placeholder")}
                      {...field}
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
              name="role"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("form.role.label")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.role.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {t(`roles.${role}`)}
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
              <Button type="submit">{tAction("save")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
