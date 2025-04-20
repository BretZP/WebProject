import connectMongoDB from "@/mongodb";
import Scale from "@/models/scaleSchema";
import {NextResponse, NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const scales = await Scale.find();
    return NextResponse.json({scales});
}

export async function POST(request: NextRequest) {
    const {name, songs} = await request.json();
    await connectMongoDB();
    await Scale.create({name, songs});
    return NextResponse.json({message: "Item added successfully"}, {status: 201});
}