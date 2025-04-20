"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom_ui/Loader";
import { useEffect, useState } from "react";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const response = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setCollectionDetails(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in CollectionDetails[GET]: ", error);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export const dynamic = "force-dynamic";

export default CollectionDetails;
