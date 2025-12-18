import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try{
        console.log(request);
        await connectDB();
        const { slug } = await params;
        console.log(slug);
        const event = await Event.findOne({ slug: slug });
        if (!event) {
            return new NextResponse(JSON.stringify({ message: "Event not found" }), { status: 404 });
        }
        return new NextResponse(JSON.stringify(event), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}