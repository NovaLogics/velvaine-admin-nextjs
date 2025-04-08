"use client";
import { FC, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
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

  const addValue = (value: string) => {
    onChange(value);
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
            addValue(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge className="bg-grey-1 text-white" key={index} variant="outline">
            {item}
            <button
              className="ml-1 rounded-full outline-none text-white hover:bg-red-1"
              onClick={() => onRemove(item)}
       
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
