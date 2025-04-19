import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
import { model } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    await connectToDB();

    let { orderId } = await params;

    const orderDetails = await Order.findById(orderId).populate({
        path: "products.product",
        model: Product,
    });

    if(!orderDetails){
        return new Response(JSON.stringify({ message: "Order not found" }), { status: 404 });
    }

    const customer = await Customer.findOne({ clerkId: orderDetails.customerClerkId });

    return NextResponse.json({orderDetails, customer}, { status: 200 });
  } catch (error) {
    console.log("Error in GET /api/orders", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
