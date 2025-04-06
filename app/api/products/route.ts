import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collection,
      tags,
      sizes,
      colors,
      stock,
      price,
      expense,
    } = await request.json();

    if (
      !title ||
      !description ||
      !media ||
      !category ||
      !stock ||
      !price ||
      !expense
    ) {
      return new NextResponse(
        "Title, Description, Media, Category, stock, Price and Expense are required!",
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collection,
      tags,
      sizes,
      colors,
      stock,
      price,
      expense,
    });

    await newProduct.save();

    return NextResponse.json(
      {
        message: "Product created successfully!",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating product:", error);
    return new NextResponse("Failed to create product!", { status: 500 });
  }
};
