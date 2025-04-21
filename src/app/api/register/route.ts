import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/mongodb";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
    
        if (!username || !password) {
          return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
        }
    
        await connectMongoDB();
    
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return NextResponse.json({ message: "Username already taken" }, { status: 409 });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
    
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    
      } catch (error) {
        console.error("Error in /api/register:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }
}