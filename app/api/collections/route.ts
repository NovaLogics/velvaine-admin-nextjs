import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {

    const user = await currentUser()

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    const {title, description, image} = await req.json();

    const existingCollection = await Collection.findOne({ title });

    if(existingCollection){
        return new NextResponse("Collection already exists", { status: 409 });
    }

    if(!title || !image){
        return new NextResponse("Title and Image are required!", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();

    return NextResponse.json(newCollection, { status: 201 });
        
  } catch (error) {
    console.log("Error in POST /api/collections", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const GET = async (req: NextRequest) => {
  try{
    await connectToDB();

    const collections = await Collection.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, { status: 200 });
  }catch (error) {
    console.log("Error in GET /api/collections", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}