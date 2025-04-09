import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
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
