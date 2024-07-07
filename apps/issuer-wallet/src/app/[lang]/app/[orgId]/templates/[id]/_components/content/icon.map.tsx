import { JsonSchemaType } from "@stamp/domain";
import {
  Binary,
  CaseSensitive,
  CircleSlash2,
  List,
  Network,
  Sigma,
  SigmaSquare,
} from "lucide-react";
import { ReactNode } from "react";

export const iconMap: Record<JsonSchemaType, ReactNode> = {
  array: <List className="h-4 w-4 mr-2" />,
  boolean: <Binary className="h-4 w-4 mr-2" />,
  integer: <Sigma className="h-4 w-4 mr-2" />,
  number: <SigmaSquare className="h-4 w-4 mr-2" />,
  object: <Network className="h-4 w-4 mr-2" />,
  string: <CaseSensitive className="h-4 w-4 mr-2" />,
  null: <CircleSlash2 className="h-4 w-4 mr-2" />,
};
