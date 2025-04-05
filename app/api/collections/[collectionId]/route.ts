import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    const { collectionId } = await params

    await Collection.findByIdAndDelete(collectionId);

    return new NextResponse("Collection deleted successfully", { status: 200 });
  } catch (error) {
    console.log("Error in DELETE /api/collections", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
