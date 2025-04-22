import { NextResponse } from 'next/server';
import connectMongoDB from '@/mongodb';
import UserSong from '@/models/userSongSchema';
import { auth } from '@/auth';

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    try {
        await connectMongoDB();
        const { scaleName, songTitle } = await request.json();
        const trimmedSongTitle = songTitle?.trim();

        if (!scaleName || !trimmedSongTitle) {
            return NextResponse.json({ message: "Missing scaleName or songTitle" }, { status: 400 });
        }

        const existing = await UserSong.findOne({ userId, scaleName, songTitle: trimmedSongTitle });
        if (existing) {
            return NextResponse.json({ message: `You already added "${trimmedSongTitle}" to ${scaleName}` }, { status: 409 });
        }

        const newUserSong = await UserSong.create({
            userId,
            scaleName,
            songTitle: trimmedSongTitle
        });

        return NextResponse.json({ message: "Song added successfully!", song: newUserSong }, { status: 201 });

    } catch (error: any) {
        console.error("Error in POST /api/scales/add-song:", error);
        if (error.code === 11000) {
            return NextResponse.json({ message: `You already added that song to ${error.keyValue.scaleName}` }, { status: 409 });
        }
        return NextResponse.json({ message: "Internal Server Error adding song" }, { status: 500 });
    }
}
