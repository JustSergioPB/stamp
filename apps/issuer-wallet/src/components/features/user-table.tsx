import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Paginator from "@components/stamp/paginator";
import { useTranslation } from "@i18n/server";
import TextCell from "@components/stamp/text-cell";
import { PaginatedList } from "@lib/query";
import { User } from "@features/users/models";
import { Badge } from "@components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@lib/utils";

export type Column<T> = {
  key: keyof T | "actions";
  name: string;
  className?: string;
};

type Props = {
  lang: string;
  result: PaginatedList<User>;
};

const columns: Column<User>[] = [
  {
    key: "profilePic",
    name: "",
    className: "w-1/12",
  },
  {
    key: "name",
    name: "form.name.label",
    className: "w-2/12",
  },
  {
    key: "email",
    name: "form.email.label",
    className: "w-4/12",
  },
  {
    key: "role",
    name: "form.role.label",
    className: "w-2/12",
  },
  {
    key: "actions",
    name: "",
    className: "w-3/12",
  },
];

export default async function UserTable({ lang, result }: Props) {
  const { t } = await useTranslation(lang, "users");

  function getCell(item: User, key: keyof User | "actions") {
    switch (key) {
      case "profilePic":
        return (
          <div>
            <Avatar>
              <AvatarImage src={item.profilePic} alt="profile" />
              <AvatarFallback>{item.name[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        );
      case "name":
        return <TextCell value={`${item.name} ${item.lastName}`} />;
      case "email":
        return <TextCell value={item.email} />;
      case "role":
        return (
          <div className="flex space-x-2">
            <Badge variant="outline">{t(`roles.${item.role}`)}</Badge>
          </div>
        );
      case "actions":
        return (
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash className="h-4 w-4" />
          </Button>
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <div className="rounded-lg border shadow-sm bg-white grow shrink-0 basis-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white w-full">
              {columns.map((column) => (
                <TableHead key={column.key}>
                  <div
                    className={cn(
                      "flex items-center space-x-2",
                      column.className
                    )}
                  >
                    {t(column.name)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.items.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    className={cn("px-4 py-2", column.className)}
                    key={column.name}
                  >
                    {getCell(item, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Paginator
        currentPage={result.currentPage}
        pageSize={result.pageSize}
        totalPages={result.totalPages}
        lang={lang}
      />
    </>
  );
}
