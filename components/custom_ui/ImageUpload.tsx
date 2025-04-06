"use client";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  let index1 = 0;
  const onUpload = (result: any) => {
    console.log("Upload Result:"+(index1++)+" : ", result);
   
    const url = result.info.secure_url;
    onChange(url);
  };

  let index = 0;
  console.log("Image URL ARR size:", value.length);
  value.forEach((url) => console.log("Image URL:"+(index++)+" : ", url));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="velvaine-admin"
        onSuccess={(result, { widget }) => {
          onUpload(result);
        }}
      >
        {({ open }) => {
          return (
            <Button className="bg-grey-1 text-white" onClick={() => open()}>
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
