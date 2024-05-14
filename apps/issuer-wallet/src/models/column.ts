import { ReactNode } from "react";

export type Column<T> = {
  key: string;
  name: string;
  cell: (item: T, lang: string) => ReactNode;
};
