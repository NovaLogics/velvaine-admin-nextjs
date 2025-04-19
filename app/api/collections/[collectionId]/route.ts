import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    let { collectionId } = await params;

    const collection = await Collection.findById(collectionId).populate({path: "products", model: Product});
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("Error in GET /api/collections", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    const { collectionId } = await params;

    let collection = await Collection.findById(collectionId);

    if (!collection) {
      console.log("Collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return new NextResponse("Collection updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("Error in POST /api/collections", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    const { collectionId } = await params;

    await Collection.findByIdAndDelete(collectionId);

    await Product.updateMany(
      { collections: collectionId },
      { $pull: { collections: collectionId } }
    );

    return new NextResponse("Collection deleted successfully", { status: 200 });
  } catch (error) {
    console.log("Error in DELETE /api/collections", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
