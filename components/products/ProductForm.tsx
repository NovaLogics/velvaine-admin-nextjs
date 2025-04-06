"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom_ui/ImageUpload";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom_ui/Delete";
import MultiText from "../custom_ui/MultiText";

const formSchema = z.object({
  title: z.string().min(2).max(24).trim(),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string().min(2).max(32).trim(),
  collection: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  stock: z.coerce.number().min(0),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null; // Must stay optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collection: [],
          tags: [],
          sizes: [],
          colors: [],
          stock: 0,
          price: 0.1,
          expense: 0.1,
        },
  });

  const handleKeyPress = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${params.productId}`
        : "/api/products"; //params.productId || initialData._id
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setLoading(false);
        toast.success(
          `Product ${initialData ? "updated" : "created"} successfully!`
        );
        window.location.href = "/products";
        router.push("/products");
      } else {
        setLoading(false);
        toast.success("Failed to create products! Please try again!");
        console.error("Failed to create products:", response.statusText);
      }
    } catch (error) {
      setLoading(false);
      toast.success("Failed to create products! Please try again!");
      console.error("Error creating products:", error);
    }
  };

  return (
    <div className="p-10 w-full">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="description"
                    {...field}
                    rows={8}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image */}
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ---- */}
          <div className="md:grid md:grid-cols-3 gap-8">
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="price"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Expense */}
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="expense"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="stock"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* ---- */}
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="category"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Tags"
                    value={field.value}
                    onChange={(tag) => field.onChange([...field.value, tag])}
                    onRemove={(tagToRemove) =>
                      field.onChange([
                        ...field.value.filter((tag) => tag !== tagToRemove),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Button Group */}
          <div className="flex gap-10">
            <Button className="bg-blue-1 text-white" type="submit">
              Submit
            </Button>
            <Button
              className="bg-blue-1 text-white"
              type="button"
              onClick={() => router.push("/collections")}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
