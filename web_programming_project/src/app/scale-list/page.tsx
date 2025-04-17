'use client'
import Card from '../components/card';
import Navbar from "@/app/components/Navbar";
import { scaleCards, ScaleCard} from "@/app/components/scales";

interface SongListProps {
    isLoggedIn: boolean;
}
const SongList = ({ isLoggedIn = true }: SongListProps)  => {
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
                    {scaleCards.map((card: ScaleCard, index) => (
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