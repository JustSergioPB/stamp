import { TemplateSchema } from "@schemas/template";

type Props = {
  item: TemplateSchema;
};

export default function NameCell({ item }: Props) {
  return (
    <div className="flex space-x-2">
      <span className="max-w-[500px] truncate font-medium">{item.name}</span>
    </div>
  );
}
