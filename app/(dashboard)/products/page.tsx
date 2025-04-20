"use client";

import { DataTable } from "@/components/custom_ui/DataTable";
import Loader from "@/components/custom_ui/Loader";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>

        <Button
        type="button"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => router.push("/products/create")}
        >
          <PlusSquare className="h-8 w-8 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 my-5" />

      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Products;
