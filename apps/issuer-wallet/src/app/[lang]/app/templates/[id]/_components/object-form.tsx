import { ContentSchema } from "@schemas/template";
import { Control } from "react-hook-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  control?: Control<ContentSchema, any>;
  lang: string;
  prefix: string;
}

export default function ObjectForm({ control, lang }: Props) {
  return <></>;
}
