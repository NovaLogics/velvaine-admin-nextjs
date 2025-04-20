import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const { productId } = await params;

    const product = await Product.findById(productId);

    if(!product){
        return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    const relatedProducts = await Product.find({
    $or:[
      {category: product.category},
      {collections: {$in: product.collections}},  
    ],
    _id: { $ne: productId },
    });

    if(!relatedProducts){
     return new NextResponse(JSON.stringify({ message: "No related products found" }), { status: 404 });
    }    
    
    return NextResponse.json(relatedProducts, { status: 200});

  } catch (error) {
    console.log("Error in GET /api/products/related", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
