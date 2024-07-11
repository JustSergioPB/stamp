import { TemplateState } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";
import { cn } from "@lib/utils";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  value: TemplateState;
  lang: string;
}

export default async function StateBadge({ value, lang }: Props) {
  const { t } = await useTranslation(lang, "template");
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-sm",
        {
          "bg-orange-100 text-orange-500": value === "public",
          "bg-purple-100 text-purple-500": value === "private",
          "bg-gray-100 text-gray-500": value === "draft",
          "bg-red-100 text-red-500": value === "deprecated",
        },
        "flex items-center"
      )}
    >
      <div
        className={cn("w-2 h-2 rounded-full mr-2", {
          "bg-orange-500": value === "public",
          "bg-purple-500": value === "private",
          "bg-gray-500": value === "draft",
          "bg-red-500": value === "deprecated",
        })}
      ></div>
      {t(`state.${value}`)}
    </span>
  );
}
