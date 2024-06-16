import { DataTableRowActions } from "@components/stamp/data-table-row-actions";
import { Badge } from "@components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Column } from "@models/ui/column";
import { TemplateSchema } from "@schemas/template/template.schema";

export const COLUMNS: Column<TemplateSchema>[] = [
  {
    key: "name",
    name: "schemaTable.name",
    cell: (item) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{item.name}</span>
      </div>
    ),
  },
  {
    key: "types",
    name: "schemaTable.types",
    cell: (item) => {
      const types = item.type ?? [];
      const displayed = types.slice(0, 2);
      const hidden = types.slice(2);

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] flex gap-1">
            <Badge>{displayed[0]}</Badge>
            {displayed[1] && <Badge>{displayed[1]}</Badge>}
            {hidden.length > 0 && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>+{hidden.length}</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{hidden.join("; ")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </span>
        </div>
      );
    },
  },
  {
    key: "status",
    name: "schemaTable.status",
    cell: (item, lang) => (
      <div className="flex w-[100px] items-center">
        <span>
          <Badge variant="outline">
            Status
          </Badge>
        </span>
      </div>
    ),
  },
  {
    key: "lang",
    name: "schemaTable.lang",
    cell: (item) => (
      <div className="flex items-center">
        <span>{item.lang}</span>
      </div>
    ),
  },
  {
    key: "actions",
    name: "schemaTable.actions",
    cell: (_, lang) => <DataTableRowActions lang={lang} />,
  },
];
