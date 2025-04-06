"use client";
import { FC, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addTag = (tag: string) => {
    onChange(tag);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addTag(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((tag, index) => (
          <Badge className="bg-grey-1 text-white" key={index} variant="outline">
            {tag}
            <Button
              className="ml-1 rounded-full outline-none text-white hover:bg-red-1"
              onClick={() => onRemove(tag)}
              size="sm"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
