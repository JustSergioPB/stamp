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
import { Input } from "@components/ui/input";
import { sendMagicLinkCommand } from "@features/users/commands";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/client";
import { cn } from "@lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props extends React.HtmlHTMLAttributes<HTMLFormElement> {
  lang: string;
}

export default function MagicLinkForm({ lang, className }: Props) {
  const { t } = useTranslation(lang, "auth");
  const defaultCountDown = 30;
  const [countDown, setCountDown] = React.useState<number>(defaultCountDown);
  const [loading, setLoading] = React.useState<boolean>(false);

  const magicLinkZod = z.object({
    email: z.string().email(),
  });

  type MagicLinkZod = z.infer<typeof magicLinkZod>;

  const form = useForm<MagicLinkZod>({
    resolver: zodResolver(magicLinkZod),
  });

  async function handleSubmit(formData: MagicLinkZod) {
    setLoading(true);

    const { errorCode } = await sendMagicLinkCommand(formData.email, lang);

    if (errorCode) {
      toast.error(t(`magicLink.errors.${errorCode}`));
    } else {
      startCountDown();
      toast.success(t("magicLink.success"));
    }

    setLoading(false);
  }

  function startCountDown() {
    let count = defaultCountDown;
    const interval = setInterval(() => {
      count -= 1;
      setCountDown(count);
      if (count <= 0) {
        clearInterval(interval);
        setCountDown(defaultCountDown);
      }
    }, 1000);
  }

  return (
    <Form {...form}>
      <form
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t("magicLink.form.email.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("magicLink.form.email.placeholder")}
                  type="email"
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
        <Button
          className="w-full"
          disabled={loading || countDown !== defaultCountDown}
        >
          {countDown !== defaultCountDown && (
            <span className="mr-2">({countDown})</span>
          )}
          {loading && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
          {t("magicLink.form.button")}
        </Button>
      </form>
    </Form>
  );
}
