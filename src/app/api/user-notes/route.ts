
import { NextResponse } from 'next/server';
import connectMongoDB from '@/mongodb';
import UserScaleNote from '@/models/userScaleNoteSchema';
import { auth } from '@/auth';


export async function GET(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {

        return NextResponse.json({ notes: {} }); 
    }

    try {
        await connectMongoDB();
        const notes = await UserScaleNote.find({ userId });


        const notesMap: Record<string, string> = {};
        notes.forEach(note => {
            notesMap[note.scaleName] = note.notesText;
        });

        return NextResponse.json({ notes: notesMap });
    } catch (error) {
        console.error("Error fetching user notes:", error);
        return NextResponse.json({ message: "Internal Server Error fetching notes." }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectMongoDB();
        const { scaleName, notesText } = await request.json();

        if (typeof scaleName !== 'string' || !scaleName || typeof notesText !== 'string') {
            return NextResponse.json({ message: "Missing or invalid scaleName or notesText" }, { status: 400 });
        }

        // Similar logic to POST but using PUT for semantic correctness
        const updatedNote = await UserScaleNote.findOneAndUpdate(
            { userId, scaleName },
            { $set: { notesText: notesText } },
            {
                new: true,
                upsert: true // Still allow creation if it doesn't exist
            }
        );

        return NextResponse.json({ message: "Note updated successfully.", note: updatedNote }, { status: 200 });

    } catch (error) {
        console.error("Error updating user note:", error);
        return NextResponse.json({ message: "Internal Server Error updating note." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectMongoDB();
        const { scaleName, notesText } = await request.json();

        if (typeof scaleName !== 'string' || !scaleName || typeof notesText !== 'string') {
            return NextResponse.json({ message: "Missing or invalid scaleName or notesText" }, { status: 400 });
        }


        const updatedNote = await UserScaleNote.findOneAndUpdate(
            { userId, scaleName }, 
            { $set: { notesText: notesText } }, 
            {
                new: true, 
                upsert: true 
            }
        );

        return NextResponse.json({ message: "Note saved successfully.", note: updatedNote }, { status: 200 });

    } catch (error) {
        console.error("Error saving user note:", error);
        return NextResponse.json({ message: "Internal Server Error saving note." }, { status: 500 });
    }
}