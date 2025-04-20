"use client";
import Loader from "@/components/custom_ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProductDetails = async () => {
    try {
      setLoading(true);
      let { productId } = await params;

      const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setProductDetails(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in ProductDetails[GET]: ", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return loading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

export const dynamic = "force-dynamic";

export default ProductDetails;
