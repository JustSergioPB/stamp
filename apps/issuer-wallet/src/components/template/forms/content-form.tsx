"use client";

import { TemplateSchema } from "@schemas/template/template.schema";
import { Control } from "react-hook-form";
import TreeAngle from "@components/stamp/tree-angle";
import { FormField, FormItem, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { cn } from "@lib/utils";
import { useTranslation } from "@i18n/client";

type Props = {
  control?: Control<TemplateSchema, any>;
  className?: string;
  lang: string;
};

export default function ContentForm({ control, className, lang }: Props) {
  const { t } = useTranslation(lang, "template");
  return (
    <FormField
      control={control}
      name="content"
      render={() => (
        <FormItem
          className={cn(className, "grow shrink-0 basis-auto flex flex-col")}
        >
          <div className="block grow shrink-0 basis-auto">
            <div className="flex">
              <span className="border-l-2 border-l-neutral-300 inline-block"></span>
              <ul className="w-full"></ul>
            </div>
            <TreeAngle>
              <Button variant="secondary" size="sm" type="button">
                <CirclePlus className="h-4 w-4 mr-2" />
                {t("form.actions.addField")}
              </Button>
            </TreeAngle>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
