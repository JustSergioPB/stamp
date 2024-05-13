"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import SchemaForm from "@components/schemas/schema-form";
import { Button } from "@components/ui/button";
import { CirclePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
};

export function Sidepanel({ isOpen }: Props) {
  const router = useRouter();

  function onOpenClick() {
    router.push("?mode=create");
  }

  function onClose() {
    router.back();
  }

  return (
    <>
      <Button size="sm" onClick={onOpenClick}>
        <CirclePlus className="h-4 w-4 mr-2" />
        Add schema
      </Button>
      <div
        data-state={isOpen ? "open" : "closed"}
        className="fixed inset-0 z-40 bg-neutral/500 backdrop-blur-sm transition-opacity duration-300 ease-in-out [&[data-state=open]]:opacity-100 [&[data-state=closed]]:pointer-events-none [&[data-state=closed]]:opacity-0 p-4"
      >
        <Card
          data-state={isOpen ? "open" : "closed"}
          className="sidepanel w-2/5 flex flex-col absolute right-4 top-4 transition-transform duration-300 ease-in-out [&[data-state=open]]:translate-x-0 [&[data-state=closed]]:translate-x-full"
        >
          <CardHeader>
            <CardTitle>Create a new schema</CardTitle>
          </CardHeader>
          <CardContent className="grow shrink-0 basis-auto">
            <SchemaForm onReset={onClose} onSubmit={onClose}></SchemaForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
