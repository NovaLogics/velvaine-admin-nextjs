"use client";
import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom_ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";

const Collections = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/collections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      } else {
        console.error("Failed to fetch collections:", response.statusText);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in Collections[GET]: ", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log("Collections: ", collections);

  return (
    <div className="w-full px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>

        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <PlusSquare className="h-8 w-8 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-5" />

      <DataTable columns={columns} data={collections} searchKey="title"/>
    </div>
  );
};

export default Collections;
