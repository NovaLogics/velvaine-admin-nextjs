import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
    await connectToDB();
    const { query } = params;
    const searchedProducts = await Product.find({
      $or: [
        {
          title: { $regex: query, $options: "i" },
        },
        {
          category: { $regex: query, $options: "i" },
        },
        {
          tags: { $in: [new RegExp(query, "i")] },
        },
      ],
    });

    return NextResponse.json(searchedProducts, { status: 200 });
  } catch (error) {
    console.log("Error in GET /api/search", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";