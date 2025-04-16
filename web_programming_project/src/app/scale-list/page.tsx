'use client'
import Card from '../components/card';
import gmajorImage from '../assets/gmajor.PNG';
import cmajorImage from '../assets/cmajor.PNG';
import fminorImage from '../assets/fminor.PNG';
import Navbar from "@/app/components/Navbar";

interface SongListProps {
    isLoggedIn: boolean;
}
const SongList = ({ isLoggedIn = true }: SongListProps)  => {
    const scaleCards = [
        {
            title: "C Major",
            notes: "Notes: C, D, E, F, G, A, B",
            chords: ["Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bdim7"],
            songs: ["Let it be, Beatles", "Californication, Red Hot Chili Peppers"],
            imageUrl: cmajorImage.src,
            imageAlt: "image of guitar tabs of C Major",
            className: "hover:shadow-lg transition-shadow"
        },
        {
            title: "G Major",
            notes: "Notes: G, A, B, C, D, E, F#",
            chords: ["G", "Am", "Bm", "C", "D", "Em", "F#mb5"],
            songs: ["Enter Sandman, Metallica", "Ring of fire, Johny Cash"],
            imageUrl: gmajorImage.src,
            imageAlt: "G major scale",
            className: "hover:shadow-lg transition-shadow"
        },
        {
            title: "F Minor",
            notes: "Notes: F, G, A♭, B♭, C, D♭, E♭",
            chords: ["Fm", "Gdim", "A♭", "B♭m", "Cm", "D♭", "E♭"],
            songs: ["Dream On, Aerosmith"],
            imageUrl: fminorImage.src,
            imageAlt: "F minor scale",
            className: "hover:shadow-lg transition-shadow",

        }
    ];
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-black pt-16 p-4"> {/* Added pt-16 for top padding */}
                <div className="container max-w-2xl mx-auto flex flex-col gap-6 text-white">
                    <div></div>
                    <input
                        type="text"
                        placeholder="Search for a scale"
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-400 bg-transparent"
                    />
                    {scaleCards.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            notes={card.notes}
                            songs={card.songs}
                            chords={card.chords}
                            imageUrl={card.imageUrl}
                            imageAlt={card.imageAlt}
                            className={card.className}
                        >
                            {isLoggedIn && (
                                <a
                                    href={`../form-submit`}
                                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-green-700 transition-colors block text-center"
                                >
                                    Add songs in this key
                                </a>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SongList;