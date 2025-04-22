import { NextResponse } from 'next/server';
import connectMongoDB from '@/mongodb';
import UserSong, { IUserSong } from '@/models/userSongSchema';
import { auth } from '@/auth';

export async function GET(request: Request) {
    const session = await auth();
    const userId = session?.user?.id;

    try {
        await connectMongoDB();

        let userSongs: IUserSong[] = [];
        if (userId) {
            userSongs = await UserSong.find({ userId }).sort({ createdAt: -1 });
        }

        return NextResponse.json({ songs: userSongs }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user songs:", error);
        return NextResponse.json({ message: "Internal Server Error fetching songs." }, { status: 500 });
    }
}
