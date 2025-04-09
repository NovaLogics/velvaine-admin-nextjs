import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    let { productId } = await params;

    const productDetails = await Product.findById(productId).populate({
      path: "collections",
      model: Collection,
    });
    if (!productDetails) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(productDetails, { status: 200 });
  } catch (error) {
    console.log("Error in GET /api/products", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    const { productId } = await params;

    let product = await Product.findById(productId);

    if (!product) {
      console.log("Product not found", { status: 404 });
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      stock,
      price,
      expense,
    } = await req.json();

    if (
      !title ||
      !description ||
      !media ||
      !category ||
      !price ||
      !expense ||
      !stock
    ) {
      return new NextResponse(
        "Title, description, media, category, price, expense and stock are required",
        { status: 400 }
      );
    }

    // included in new data, but not included in the previous data
    const addedCollections = collections.filter(
      (collectionId: string) => !product?.collections?.includes(collectionId)
    );

    // included in previous data, but not included in the data
    const removedCollections = product?.collections?.filter(
      (collectionId: string) => !collections?.includes(collectionId)
    );

    // Update collections
    await Promise.all([
      //Update added collections with this product
      ...addedCollections?.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: productId },
        })
      ),
      //Update removed collections with this product
      ...removedCollections?.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: productId },
        })
      ),
    ]);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        stock,
        price,
        expense,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(
      {
        message: "Product updated successfully!",
        product: updatedProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in POST /api/products", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
