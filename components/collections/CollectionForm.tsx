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

const formSchema = z.object({
  title: z.string().min(2).max(24).trim(),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null; // Must stay optional
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
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
          image: "",
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
        ? `/api/collections/${params.collectionId}`
        : "/api/collections"; //params.collectionId || initialData._id
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
          `Collection ${initialData ? "updated" : "created"} successfully!`
        );
        window.location.href = "/collections";
        router.push("/collections");
      } else {
        setLoading(false);
        toast.success("Failed to create collection! Please try again!");
        console.error("Failed to create collection:", response.statusText);
      }
    } catch (error) {
      setLoading(false);
      toast.success("Failed to create collection! Please try again!");
      console.error("Error creating collection:", error);
    }
  };

  return (
    <div className="p-10 w-full">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Collection</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default CollectionForm;
