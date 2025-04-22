import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { Song } = body;

        if (!Song || typeof Song !== 'string' || Song.trim().length === 0) {
            return NextResponse.json({ message: 'Song field is required and must be a non-empty string.' }, { status: 400 });
        }

        console.log(`Received song request: ${Song}`);

        let foundKey = "Unknown";
        if (Song.toLowerCase().includes("bohemian rhapsody")) {
            foundKey = "Bb Major / G Minor";
        } else if (Song.length % 2 === 0) {
            foundKey = "C Major";
        } else {
            foundKey = "A Minor";
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({ key: foundKey }, { status: 200 });

    } catch (error: any) {
        console.error("API Error:", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
