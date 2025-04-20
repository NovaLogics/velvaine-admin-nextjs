import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    await connectToDB();

    const { customerId } = await params;

    const orders = await Order.find({ customerClerkId: customerId }).populate({
      path: "products.product",
      model: Product,
    });

    return NextResponse.json(orders, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.log("Error in GET /api/orders/customers", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
