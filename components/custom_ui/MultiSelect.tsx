"use client";
import React, { useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  let selectedCollection: CollectionType[];

  if (value.length > 0) {
    selectedCollection = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  } else {
    selectedCollection = [];
  }

  const selectables = collections?.filter(
    (collection) => !selectedCollection.includes(collection)
  );

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selectedCollection.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              type="button"
              className="ml-1 hover:bg-red-1"
              onClick={() => {
                onRemove(collection._id);
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto borader border-grey-3 bg-white rounded-md shadow-md">
            {selectables?.map((collection) => (
              <CommandItem
                key={collection._id}
                onMouseDown={(event) => event.preventDefault()}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
