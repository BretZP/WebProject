import { NextResponse } from 'next/server';
import connectMongoDB from '@/mongodb';
import UserSong from '@/models/userSongSchema';
import { auth } from '@/auth';

export async function DELETE(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    try {
        await connectMongoDB();
        const { scaleName, songTitle } = await request.json();

        if (!scaleName || !songTitle) {
            return NextResponse.json({ message: "Missing scaleName or songTitle" }, { status: 400 });
        }

        const deleteResult = await UserSong.deleteOne({
            userId,
            scaleName,
            songTitle
        });

        if (deleteResult.deletedCount === 0) {
            return NextResponse.json({ message: "Song not found or you don't have permission to delete it." }, { status: 404 });
        }

        return NextResponse.json({ message: "Song deleted successfully." }, { status: 200 });

    } catch (error) {
        console.error("Error in DELETE /api/scales/delete-song:", error);
        return NextResponse.json({ message: "Internal Server Error deleting song." }, { status: 500 });
    }
}
