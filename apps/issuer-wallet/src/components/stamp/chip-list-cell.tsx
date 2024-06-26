import { Badge } from "@components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  value: string[];
}

export default function ChipListCell({ value }: Props) {
  const displayed = value.slice(0, 2);
  const hidden = value.slice(2);
  return (
    <div className="flex space-x-2">
      <span className="max-w-[500px] flex gap-1">
        {displayed[0] && <Badge>{displayed[0]}</Badge>}
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
}
