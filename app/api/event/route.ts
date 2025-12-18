import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import { v2 as cloudinary } from "cloudinary";

export async function POST(request: NextRequest) {
    try{
        await connectDB();
        const formData = await request.formData();
    
        let eventData;

        try {
            eventData = Object.fromEntries(formData.entries());
        } catch (error) {
            console.error("Invalid JSON parsing form data:", error);
            return NextResponse.json({ error: "Bad Request" }, { status: 400 });
        }
        const file = formData.get("image") as File;
        if (!file)
            return NextResponse.json({ error: "No image provided" }, { status: 400 });

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "DevEvent",
                    resource_type: "image",
                }, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            ).end(buffer);
        });

        eventData.image = (uploadResult as { secure_url: string }).secure_url;

        const createEvent = await Event.create(eventData);
        return NextResponse.json({ message: "Event created successfully", event: createEvent }, { status: 201 });
    } catch (error) {
        console.error("Error handling event POST request:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function GET() {
    try{
        await connectDB();
        const events = await Event.find({}).sort({ created_at: -1 });
        return NextResponse.json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}