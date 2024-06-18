"use client";

import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  placeholder: string; //t("form.base.type.placeholder")
  onRemove: (value: string[]) => void;
  onEnter: (value: string[]) => void;
  onReset: () => void;
};

export default function ChipInput({
  placeholder,
  onRemove,
  onEnter,
  onReset,
}: Props) {
  const [value, setValue] = useState("");
  const [chips, setChips] = useState<string[]>([]);

  return (
    <div className="max-w-full">
      <div className="flex items-center gap-2 mb-2">
        <Input
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }

            if (e.key === "Enter" && value !== "") {
              const added = chips.concat(value);
              setChips(added);
              onEnter(added);
              setValue("");
            }
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={value.length === 0 && chips.length === 0}
          onClick={() => {
            setValue("");
            setChips([]);
            onReset();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 bg-neutral-100 rounded-lg p-2 min-h-10">
        {chips.map((chip, index) => (
          <Badge
            key={`${chip}-${index}`}
            onClick={() => {
              const removed = chips.filter((_, i) => i !== index);
              setChips(removed);
              onRemove(removed);
            }}
          >
            {chip}
          </Badge>
        ))}
      </div>
    </div>
  );
}
