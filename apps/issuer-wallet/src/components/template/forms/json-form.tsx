import { Button } from "@components/ui/button";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@components/ui/collapsible";
import { cn } from "@lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type Props = {
  className?: string;
};

export default function JsonForm({ className }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(className, "space-y-2")}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <div className="flex items-center"></div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        
      </CollapsibleContent>
    </Collapsible>
  );
}
