import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb";
import Audience from "@/models/Audience";

export async function POST(request: NextRequest) {
    try{
        await connectDB();
        const data = await request.json();
        try {
            console.log(data);
            const createAudience = await Audience.create(data);
            console.log("Audience created:", data);
            return NextResponse.json({ message: "Audience created successfully", audience: createAudience }, { status: 201 });
        } catch (error) {
            console.error("Error creating audience:", error);
            return NextResponse.json({ error: error }, { status: 400 });
        }
    } catch (error) {
        console.error("Error handling audience POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try{
        await connectDB();
        const audiences = await Audience.find({}).sort({ category: 1 });
        return NextResponse.json({ audiences });
    } catch (error) {
        console.error("Error fetching audiences:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}