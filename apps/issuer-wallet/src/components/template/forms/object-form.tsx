import { TemplateSchema } from "@schemas/template";
import { Control, UseFormWatch } from "react-hook-form";

type Props = {
  watch: UseFormWatch<TemplateSchema>;
  control?: Control<TemplateSchema, any>;
  lang: string;
  prefix: string;
};

export default function ObjectForm({ control, lang, watch }: Props) {
  return <></>;
}
