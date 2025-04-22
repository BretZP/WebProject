// src/app/api/user-notes/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/mongodb';
import UserScaleNote from '@/models/userScaleNoteSchema';
import { auth } from '@/auth';

// --- GET Handler: Fetch all notes for the logged-in user ---
export async function GET(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        // Not an error, just means no user-specific notes to fetch
        return NextResponse.json({ notes: {} }); // Return empty object
    }

    try {
        await connectMongoDB();
        const notes = await UserScaleNote.find({ userId });

        // Convert array of notes into a Record<string, string> for easier frontend use
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


// --- POST Handler: Create or Update (Upsert) a note ---
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

        // Find existing note or create/update it (upsert)
        const updatedNote = await UserScaleNote.findOneAndUpdate(
            { userId, scaleName }, // Filter: find note for this user and scale
            { $set: { notesText: notesText } }, // Update: set the notesText
            {
                new: true, // Return the updated document
                upsert: true // Create if doesn't exist
            }
        );

        return NextResponse.json({ message: "Note saved successfully.", note: updatedNote }, { status: 200 });

    } catch (error) {
        console.error("Error saving user note:", error);
        return NextResponse.json({ message: "Internal Server Error saving note." }, { status: 500 });
    }
}